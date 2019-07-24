import React from 'react';
import Board from "./Board";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          location: Array(2).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let location = [];
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    location.push((i%3+1));
    location.push(Math.ceil(i/3));
    this.setState({
      history: history.concat([
        {
          squares: squares,
          location: location
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }
  reverseStep() {
    this.setState({
      stepNumber: this.state.stepNumber-1,
      xIsNext: ((this.state.stepNumber-1) % 2) === 0
    });
  }
  NextStep() {
    this.setState({
      stepNumber: this.state.stepNumber+1,
      xIsNext: ((this.state.stepNumber+1) % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares).winner;

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} style = {move === this.state.stepNumber? {fontWeight: 'bold'}:{}}>{desc}</button>
          {"Column: "+history[move].location[0] + ", Row: " + history[move].location[1]}
        </li>
      );
    });
    let status;
    let sty;
    let posi;
    if (winner) {
      status = "Winner: " + winner;
      sty = {backgroundColor:'gold'};
      posi = calculateWinner(current.squares).position;
    } else if(this.state.stepNumber === 9){
      status = "No one Win";
      sty = {};
      posi = [];
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      sty = {};
      posi = [];
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            style = {sty}
            position = {posi}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="game-buttons">
        <button onClick={() => this.reverseStep()} disabled = {this.state.stepNumber === 0}>Reverse Step</button>
        <button onClick={() => this.NextStep()} disabled = {this.state.stepNumber >= moves.length-1}>Next Step</button>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner:squares[a],
        position: [a,b,c]
        };
      
    }
  }
  return {
    winner: null,
    position: null
  };

}

export default App;
