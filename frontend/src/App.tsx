import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/login'
import Register from './pages/register/register'
import Dashboard from './pages/dashboard/dashboard'
import CreateProjectPage from './pages/project/project-create'
import ProjectDetails from './pages/project/project-details'

function App() {
 

  return (
    <Router>
      <Routes>
       <Route path='login' element={<Login/>}/>
       <Route path='Register' element={<Register/>} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/project/create" element={<CreateProjectPage />} />
       <Route path="/project/create/:id" element={<CreateProjectPage />} />
       <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  )
}

export default App
