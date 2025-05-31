import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Stopwatch from './components/Stopwatch';
import TabsComponent from './components/TabsComponent';
import FormValidation from './components/FormValidation';
import EmojiInterpreter from './components/EmojiInterpreter';
import DynamicList from './components/DynamicList';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div>

        <nav className="top-navbar bg-dark text-white px-3 py-4 d-flex align-items-center justify-content-between flex-wrap">
          <h4 className="mb-0">🚀 Mini Projects</h4>
          <ul className="nav flex-wrap">
            <li className="nav-item">
              <NavLink to="/" end className="nav-link text-white">🏠 Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/stopwatch" className="nav-link text-white">⏱ Stopwatch</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/tabs" className="nav-link text-white">📑 Tabs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/form-validation" className="nav-link text-white">📝 Form</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/emoji" className="nav-link text-white">😊 Emoji</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/list" className="nav-link text-white">📋 List</NavLink>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="main-content p-4 animate__animated animate__fadeIn">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stopwatch" element={<Stopwatch />} />
            <Route path="/tabs" element={<TabsComponent />} />
            <Route path="/form-validation" element={<FormValidation />} />
            <Route path="/emoji" element={<EmojiInterpreter />} />
            <Route path="/list" element={<DynamicList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
