import './App.css'
import { Route, Routes } from 'react-router'
import NavBar from './components/navigation/NavBar'
import Home from './pages/Home'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index path='/' element={<Home/>} />
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
