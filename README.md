## React Flow Application

A  node-based diagramming application built with React Flow. This application allows you to create, connect, and manage styled nodes with a context menu and drag-and-drop functionality.

## Features

 Right-click context menu with "Hello World" option
 Drag-and-drop blocks from sidebar to canvas
 Connect nodes with edges
 Dynamic numbering of blocks
 Professional UI with clean design

## Prerequisites

Before you begin, ensure you have the following installed:
Node.js (version 14 or higher)
npm or yarn package manager
Git

## Installation
Clone the repository (if you have an existing repository):

git clone <your-repository-url>
cd react-flow
Install dependencies:

npm install
Start the development server:

npm start
Open your browser and navigate to http://localhost:3000

## Dependencies
This project uses the following main dependencies:

react (^19.1.1)

react-dom (^19.1.1)

reactflow (^11.11.4)

react-scripts (5.0.1)

For a complete list of dependencies, check the package.json file.

## Project Structure
text
src/
├── BasicReactFlow.jsx    # Main component with flow logic
├── BasicReactFlow.css    # Styles for the application
├── App.js               # Root application component
└── index.js             # Application entry point

## Usage
Adding Blocks: Drag blocks from the sidebar to the canvas

Connecting Nodes: Click and drag from the handles of nodes to create connections

Context Menu: Right-click on any node to access the context menu


## Git Commands
Initializing a New Repository
Initialize Git:

git init
git add .
git commit -m "Initial commit: React Flow application"
Add remote repository (replace with your URL):
git remote add origin https://github.com/your-username/your-repository-name.git
git branch -M main
git push -u origin main


Available Scripts

npm start - Runs the app in development mode

npm test - Launches the test runner

npm run build - Builds the app for production

npm run eject - Ejects from Create React App (one-way operation)

## Troubleshooting
Dependency issues: Delete node_modules and package-lock.json, then run npm install

Port already in use: Use npm start with a different port: PORT=3001 npm start

Git push rejected: Pull latest changes first: git pull origin main

## License
This project is open source and available for free.

## Support
If you encounter any issues or have questions:

Check the React Flow documentation: https://reactflow.dev

Search existing GitHub issues

Create a new issue with detailed information about your problem