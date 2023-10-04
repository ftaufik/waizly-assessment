import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/" element={<Home />}/>
    </Routes>
  )
}

export default App