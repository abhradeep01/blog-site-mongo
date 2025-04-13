import './App.css'
import { Route, Routes } from 'react-router'

import Home from './pages/Home'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyIdentity from './pages/VerifyIdentity'
import ChangePassword from './pages/ChangePassword'
import ChangedPassword from './pages/ChangedPassword'
import ForgetPassword from './pages/forgetpassword'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index path='/' element={<Home/>} />
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/verify' element={<VerifyIdentity/>}/>
        <Route path='/changepassword' element={<ChangePassword/>}/>
        <Route path='/changed' element={<ChangedPassword/>}/>
        <Route path='/forget' element={<ForgetPassword/>}/>
      </Routes>
    </>
  )
}

export default App
