import { useSelector } from 'react-redux'
import { RootState } from './state/store'
import Login from './components/Login'
import Posts from './components/Posts'

const App = () => {
  const username = useSelector((state: RootState) => state.user.name)

  return (
    <div className='container'> { username ? 
      <Posts/> :
      <Login/> }
  </div>
  )
}

export default App