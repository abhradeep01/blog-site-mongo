import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyIdentity from './pages/auth/VerifyIdentity';
import ChangePassword from './pages/auth/ChangePassword';
import ChangedPassword from './pages/auth/ChangedPassword';
import ForgetPassword from './pages/auth/ForgetPassword';
import MostPopular from './pages/MostPopular';
import Trending from './pages/Trending';
import About from './pages/About';
import Upload from './pages/Upload';
import PostPage from './pages/PostPage';
import Profile from './pages/Profile';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index path='/' element={<Home/>} />
          <Route index path='/:id' element={<PostPage/>} />
          <Route index path='/profile' element={<Profile/>} />
          <Route path='/most popular' element={<MostPopular/>} />
          <Route path='/upload' element={<Upload/>} />
          <Route path='/trending' element={<Trending/>} />
          <Route path='/about' element={<About/>} />
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
