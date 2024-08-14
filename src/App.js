import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Form from './components/Form';
import './App.css';

function App() {
  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<Form />} />
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
