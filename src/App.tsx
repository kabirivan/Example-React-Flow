// @ts-nocheck
import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import ReactFlow, { removeElements, Connection, Edge, Elements, Position, addEdge, isNode } from 'react-flow-renderer';

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
let idEdge = 1;
const getNodeId = () => `node_${id++}`;
const getEdgeId = () => `edge_${idEdge++}`;

function App() {
  const [elements, setElements] = useState<Elements>(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Edge<any> | Connection) => setElements((els) => addEdge(params, els));
  const yPos = useRef(100);

  const extractNumber = (nodeName) => {
    const matches = nodeName.match(/\d+/g);
    return matches[0]
  }

  console.log('elements', elements);

  const addNode = useCallback(() => {
    yPos.current += 100;
    setElements((els) => {
      const newNode = getNodeId()
      console.log('source', `node_${extractNumber(newNode) - 1}`);
      console.log('target', newNode);
      return [
        ...els,
        {
          id: newNode,
          type: 'default',
          position: { x: 500, y: yPos.current },
          data: { label: <div>Default Node</div> },
        },
        {
          id: getEdgeId(),
          source: `node_${extractNumber(newNode) - 1}`,
          target: newNode,
          animated: false
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
          onConnect={onConnect}
        />
      </div>
      <button onClick={addNode}>Add</button>
    </div>

  );
}

export default App;
