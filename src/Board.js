import React from 'react';
import Square from './Square';

export default function Board(props) {

    function renderSquare(i){
      return <Square value = {props.squares[i]} onClick = {() => props.onClick(i)} style = {props.position.includes(i)? props.style : null}/>;
    }
    const lol = Array(9).fill(null);
    const rows = 3;
    const columns = 3;
    for(let i = 0;i<rows;i++){
        lol.push(<div className = "board-row"/>);
        for(let j = 0;j<columns;j++){
            lol.push(renderSquare(j+i*3))
        }
    }
      return (
        <div>
          {lol}
        </div>
      );

  }
 