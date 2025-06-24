import { Route, Routes } from 'react-router'
import Login from './pages/auth/Login'
import Verify from './pages/auth/Verify'
import ForgetPassword from './pages/auth/ForgetPassword'
import ChangePassword from './pages/auth/ChangePassword'
import Register from './pages/auth/Register'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/forget' element={<ForgetPassword/>}/>
        <Route path='/changepassword' element={<ChangePassword/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
