import { calculateWinner } from "../utils/calculate-winner";
import Board from "./Board";
import * as React from "react";

interface ISquares {
    [key: number]: string;
}

interface IGameState {
    history: ISquares[];
    stepNumber: number;
    xIsNext: true;
}

const Game = React.createClass<{}, IGameState>({
    getInitialState() {
        return {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    },
    handleClick(i: number) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O";

        this.setState({
            history: history.concat([{
                squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    },
    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
        });
    },
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;

        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        const moves = history.map((step: string, move: number) => {
            const desc = move ?
            "Move #" + move :
            "Game start";

            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    },
});


export default Game;
