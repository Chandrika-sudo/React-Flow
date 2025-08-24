// App.js
import BasicReactFlow from './BasicReactFlow';
import { ReactFlowProvider } from 'reactflow';

function App() {
  return (
    <div className="App">
      <ReactFlowProvider>
        <BasicReactFlow />
      </ReactFlowProvider>
    </div>
  );
}

export default App;