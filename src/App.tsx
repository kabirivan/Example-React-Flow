import React, { useState } from 'react';
import './App.css';
import ReactFlow, { removeElements, addEdge, Connection, Edge, Elements, Position } from 'react-flow-renderer';

const initialElements = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Start Node' },
    draggable: false,
    position: { x: 0, y: 50 },
    sourcePosition: Position.Bottom,
  },
  // default node
  {
    id: '2',
    type: 'output', 
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    draggable: true,
    position: { x: 0, y: 150 },
    sourcePosition: Position.Right,
  },
];


function App() {
  const [elements, setElements] = useState<a>(initialElements);
  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Edge<any> | Connection) => setElements((els) => addEdge(params, els));

  return (
    <div style={{ height: 1200 }}>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        deleteKeyCode={46} /* 'delete'-key */
      />
    </div>
  );
}

export default App;
