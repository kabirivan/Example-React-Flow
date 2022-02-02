// @ts-nocheck
import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import ReactFlow, { removeElements, Connection, Edge, Elements, Position } from 'react-flow-renderer';

const initialElements = [
  {
    id: 'node_1',
    type: 'input', // input node
    data: { label: 'Start Node' },
    draggable: false,
    position: { x: 500, y: 50 },
    sourcePosition: Position.Bottom,
  },
  // default node
  // {
  //   id: '2',
  //   type: 'output',
  //   // you can also pass a React component as a label
  //   data: { label: <div>Default Node</div> },
  //   draggable: true,
  //   position: { x: 500, y: 150 },
  //   sourcePosition: Position.Right,
  // },
];
let id = 2;
let idNode = 1;
const getNodeId = () => `node_${id++}`;
const getEdgeId = () => `edge_${idNode++}`;

function App() {
  const [elements, setElements] = useState<Elements>(initialElements);
  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  // const onConnect = (params: Edge<any> | Connection) => setElements((els) => addEdge(params, els));
  const yPos = useRef(50);

  
  const addNode = useCallback(() => {
    yPos.current += 50;
    setElements((els) => {
      console.log('elements', els);
      return [
        ...els,
        {
          id: getNodeId(),
          type: 'output',
          position: { x: 500, y: yPos.current },
          data: { label: <div>Default Node</div> },
        }
      ];
    });
    
  }, []);


  const addEdge = useCallback(({ source, target }) => {
    setElements((els) => {
      console.log(source, target);
      return [
        ...els,
        {
          id: getEdgeId(),
          source,
          target
        }
      ];
    });
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ height: 500 }}>
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={addEdge}
          deleteKeyCode={46} /* 'delete'-key */
        />
      </div>
      <button onClick={addNode}>Add</button>
    </div>

  );
}

export default App;
