import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './state/store'
import Login from './components/Login'

const App = () => {
  const username = useSelector((state: RootState) => state.user.name)

  return (
    <div className='container'> { username ? 
      <div>Posts</div> :
      <Login/> }
  </div>
  )
}

export default App