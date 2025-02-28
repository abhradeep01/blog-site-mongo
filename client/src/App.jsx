import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import ForgetPassword from './pages/ForgetPassword';
import VarificationCode from './pages/VarificationCode';
import ConfirmPassword from './pages/ConfirmPassword';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './components/Home';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route path='/' element={<Home/>} />
        </Route>
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/verify' element={<VarificationCode/>}/>
        <Route path='/setpassword' element={<ConfirmPassword/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
    </>
  )
}

export default App
