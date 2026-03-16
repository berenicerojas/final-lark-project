import {Routes, Route, NavLink} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProjectLog from './pages/ProjectLog';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './App.css'

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <NavLink 
        to = "/"
        className = {({isActive}) => isActive ? 'active-link' : 'link'}
        >
          Dashboard
        </NavLink>
        <NavLink
        to = "/projects"
        className = {({ isActive }) => isActive ? 'active-link' : 'link'}
        >
          Project Log
        </NavLink>
        <NavLink
        to = "/about"
        className = {({ isActive }) => isActive ? 'active-link' : 'link'}
        >
          System Info
        </NavLink>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/projects" element={<ProjectLog/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
