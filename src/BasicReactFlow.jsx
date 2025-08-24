import { useCallback, useState, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import './BasicReactFlow.css'; // Import the CSS file

const StyledBlockNode = ({ data }) => {
  return (
    <div className="pinkBlock">
      <Handle type="target" position={Position.Top} />
      <div className="yellowLabel">
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const nodeTypes = {
  styledBlock: StyledBlockNode,
};

const BlockContextMenu = ({ top, left, onCloseMenu }) => {
  const menuReference = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (menuReference.current && !menuReference.current.contains(event.target)) {
      onCloseMenu();
    }
  }, [onCloseMenu]);

  useState(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div
      ref={menuReference}
      className="contextMenu"
      style={{ top, left }}
    >
      <div 
        className="menuItem highlightOnHover"
        onClick={() => { alert('Hello World'); onCloseMenu(); }}
      >
        Hello World
      </div>
      <div 
        className="menuItem"
        onClick={onCloseMenu}
      >
        Close
      </div>
    </div>
  );
};

const BlocksSidebar = ({ onBlockDragStart }) => {
  return (
    <div className="sidebar">
      <h3>Available Blocks</h3>
      <p>Drag blocks to the canvas</p>
      
      <div 
        className="draggableBlock"
        draggable
        onDragStart={(event) => onBlockDragStart(event, 'New Block')}
      >
        <div className="blockPreview">
          Block Template
        </div>
      </div>
    </div>
  );
};

const initialNodes = [
  { 
    id: '1', 
    position: { x: 250, y: 50 }, 
    data: { label: 'Block 1' },
    type: 'styledBlock'
  },
  { 
    id: '2', 
    position: { x: 250, y: 200 }, 
    data: { label: 'Block 2' },
    type: 'styledBlock'
  },
];

const initialEdges = [{ id: 'edge-1-2', source: '1', target: '2' }];

function FlowArea() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [menuPosition, setMenuPosition] = useState(null);
  const flowWrapper = useRef(null);
  const [flowInstance, setFlowInstance] = useState(null);
  const nextId = useRef(nodes.length + 1);

  const onConnect = useCallback((params) => setEdges((currentEdges) => addEdge(params, currentEdges)), [setEdges]);

  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setMenuPosition({
      top: event.clientY,
      left: event.clientX,
    });
  }, []);

  const onPaneClick = useCallback(() => {
    setMenuPosition(null);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const flowBounds = flowWrapper.current.getBoundingClientRect();
      const label = event.dataTransfer.getData('application/reactflow');

      if (typeof label === 'undefined' || !label) {
        return;
      }

      const position = flowInstance.project({
        x: event.clientX - flowBounds.left,
        y: event.clientY - flowBounds.top,
      });

      const newBlock = {
        id: `${nextId.current}`,
        position,
        data: { label: `Block ${nextId.current}` },
        type: 'styledBlock',
      };

      nextId.current += 1;
      setNodes((currentNodes) => currentNodes.concat(newBlock));
    },
    [flowInstance, setNodes]
  );

  const onBlockDragStart = useCallback((event, label) => {
    event.dataTransfer.setData('application/reactflow', label);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  return (
    <div className="flowContainer">
      <BlocksSidebar onBlockDragStart={onBlockDragStart} />
      <div ref={flowWrapper} className="flowArea">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeContextMenu={onNodeContextMenu}
          onPaneClick={onPaneClick}
          onInit={setFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap 
            nodeColor="#ff9ec6"
            maskColor="#fce4ec"
          />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
        
        {menuPosition && (
          <BlockContextMenu 
            top={menuPosition.top} 
            left={menuPosition.left} 
            onCloseMenu={() => setMenuPosition(null)} 
          />
        )}
      </div>
    </div>
  );
}

export default function FlowApp() {
  return (
    <ReactFlowProvider>
      <FlowArea />
    </ReactFlowProvider>
  );
}