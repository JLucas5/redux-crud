import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Login = () => {

    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState<string>('')
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    return (
        <div>Login
            <input 
                type="text"
                value={inputValue}
                onChange={handleInputChange}/>
            <button onClick={() => dispatch({ type: 'user/login', payload: inputValue })}>Log in</button>
        </div>
    )
}

export default Login