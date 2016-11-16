import * as React from "react";

interface ISquareProps {
    onClick: () => any;
    value: string;
}

const Square: React.StatelessComponent<ISquareProps> = ({value, onClick}) => {
    return (
        <button className="square" onClick={() => onClick()}>
            {value}
        </button>
    );
};

Square.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
};

export default Square;
