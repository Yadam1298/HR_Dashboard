import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@luxis-ui/react';
import Auth from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
