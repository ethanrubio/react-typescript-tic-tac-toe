import Square from "./Square";
import * as React from "react";

interface IBoardProps {
    squares: string[];
    onClick: (i: number) => any;
}

const Board: React.StatelessComponent<IBoardProps> = ({squares, onClick}) => {
    const renderSquare = (i: number) => (
        <Square value={squares[i]} onClick={() => onClick(i)} />
    );

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
};

Board.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    squares: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default Board;
