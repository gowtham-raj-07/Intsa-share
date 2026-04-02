import './App.css'
import Login from './components/Loginform/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Post from './components/Posts/Post'
import Profile from './components/Profile/Profile'
import Header from './components/Header/Header'
import MyProfile from './components/Profile/MyProfile'
import SearchPage from './components/SearchPage/SearchPage.jsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path='/profile/:userId' element={<Profile/>}/>
        <Route path='/profile/' element={<MyProfile/>}/>
        <Route path='/searchpage' element={<SearchPage/>}/>
        <Route path='/header' element={<Header/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
