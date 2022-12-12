import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Project from './components/Project'
import ProjectForm from './components/ProjectForm'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/:id' element={<Project/>} />
            <Route path='/' element={<ProjectForm />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App