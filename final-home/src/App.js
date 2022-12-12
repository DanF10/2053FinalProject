import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Project from './components/Project'
import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import ProjectsList from './pages/ProjectsList'
import Tasks from './pages/Tasks'
import { useSelector } from 'react-redux'

function App() {
  const {projects} = useSelector((state) => state.projects);
  return (
    <>
      <Router>
          <Header />
          <Routes>
            <Route path='/:id' element={<Project/>} />
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/projects' element={<ProjectsList projects={projects}/>} />
            <Route path='/tasks' element={<Tasks />} />
          </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App