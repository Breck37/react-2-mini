import React from 'react';

const Button = props => {
    return (
        <div>
            <button onClick={() => props.action(props.params)}>{props.text}</button>
        </div>
    )
}

export default Button;