import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import ForgetPassword from './pages/ForgetPassword';
import VarificationCode from './pages/VarificationCode';
import ConfirmPassword from './pages/ConfirmPassword';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import Profile from './pages/Profile';
import ProfilePosts from './components/ProfilePosts';
import ProfileSavedPost from './components/ProfileSavedPost';
import ProfileLikedPosts from './components/ProfileLikedPosts';
import NotFound from './components/NotFound';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path='/:id' element={<PostPage/>} />
          <Route path='/profile/:username' element={<Profile/>}>
            <Route index element={<ProfilePosts/>} />
            <Route path='saved' Component={<ProfileSavedPost/>} />
            <Route path='liked' element={<ProfileLikedPosts/>} />
          </Route>
        </Route>
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/verify' element={<VarificationCode/>}/>
        <Route path='/setpassword' element={<ConfirmPassword/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
