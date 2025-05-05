import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import "./Login.css"

const Login = () => {

    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState<string>('')
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    return (
        <div className="page-container">
            <div className="login-container">
                <h1>Please insert your name</h1>
                <input 
                    className='login-input'
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}/>
                <button 
                    className={`login-button ${!inputValue ? 'disabled' : ''}`} 
                    disabled={!inputValue} 
                    onClick={() => dispatch({ type: 'user/login', payload: inputValue })}>
                Log in
                </button>
            </div>
        </div>
    )
}

export default Login