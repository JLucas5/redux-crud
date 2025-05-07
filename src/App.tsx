import { useSelector } from 'react-redux'
import { RootState } from './state/store'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Posts from './components/Posts'

const App = () => {
  const username = useSelector((state: RootState) => state.user.name)

  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='login' element={<Login/>} />
        <Route path='posts' element={<Posts/>}/>
      </Routes>
    </div>
  )
}

export default App