import React from 'react';
import "./Buttons.css";

const Buttons = () => {
    return (
        <></>
    )
}

export const BtnConfirm = (props) => {
    
    return(
        <button className='btnc' onClick={props.onClick}>{props.title}</button>
    )
}

export const BtnPost = (props) => {
    return(
        <button className='btnp' onClick={props.onClick}>Post</button>
    )
}


export default Buttons