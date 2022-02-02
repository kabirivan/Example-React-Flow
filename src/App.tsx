import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import ReactFlow, { removeElements, addEdge, Connection, Edge, Elements, Position } from 'react-flow-renderer';

const initialElements = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Start Node' },
    draggable: false,
    position: { x: 500, y: 50 },
    sourcePosition: Position.Bottom,
  },
  // default node
  {
    id: '2',
    type: 'output',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    draggable: true,
    position: { x: 500, y: 150 },
    sourcePosition: Position.Right,
  },
];


function App() {
  const [elements, setElements] = useState<Elements>(initialElements);
  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Edge<any> | Connection) => setElements((els) => addEdge(params, els));
  const yPos = useRef(0);

  const addNode = useCallback(() => {
    yPos.current += 50;
    // ts-ignore
    setElements((els) => {
      console.log(els);
      return [
        ...els,
        {
          id: Math.random(),
          position: { x: 100, y: yPos.current },
          data: { label: "yo" }
        }
      ];
    });
  }, []);

  return (
    <div style={{ height: 1200 }}>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        deleteKeyCode={46} /* 'delete'-key */
      />

      <button onClick={addNode}>Add</button>
    </div>
  );
}

export default App;
