import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router";
import "./Login.css"
import { RootState } from '../state/store'

const Login = () => {

    const username = useSelector((state: RootState) => state.user.name)
    let navigate = useNavigate()

    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState<string>('')
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    useEffect( () => {
        if (username){
            navigate('/posts')
        }
    },[username])


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