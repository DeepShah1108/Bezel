import React from 'react'

function Button({ text, handleClick, acceptOrder }) {
    return ( 
    <>
        <button 
        onClick={handleClick}
        className='w-full bg-teal-950 text-white text-base mx-auto my-6 px-4 py-3 rounded-2xl hover: cursor-pointer'>{text}</button> 
    </>
);
}

export default Button;