import React from 'react'

const Inputs = () => {
  return (
    <></>
  )
}

export const Text = (props) => {
    return(
        <div className='text-input-wrap'>
            <p className='input-title'>{props.title}</p>
            <input
                className='text-input'
                type = {props.type}
                placeholder={props.placeholder}
                id = {`input-${props.name}`}
                name = {props.name}
                value = {props.value}
                onChange = {props.onChange}
            />
        </div>
    )
}


export default Inputs