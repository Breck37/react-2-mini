import React from 'react'
import icons from 'glyphicons';

const DeleteBtn = props => {
    return (
        <button onClick={props.action}>
            {props.text}
        </button>
    )
}

export default DeleteBtn;