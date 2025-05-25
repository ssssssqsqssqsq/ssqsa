import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AuthProvider } from './context/AuthContext';
import { MusicProvider } from './context/MusicContext';

import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ServersPage from './pages/ServersPage';
import RankedServersPage from './pages/RankedServersPage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import RadioPage from './pages/RadioPage';

function App() {
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);

  return (
    <AuthProvider>
      <MusicProvider>
        <Router>
          <div className="app-container">
            <Navbar onToggleMusicPlayer={() => setIsMusicPlayerOpen(!isMusicPlayerOpen)} />
            <MusicPlayer isOpen={isMusicPlayerOpen} onClose={() => setIsMusicPlayerOpen(false)} />
            
            <main className={`transition-all duration-300 ${isMusicPlayerOpen ? 'pl-80' : ''}`}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/servers" element={<ServersPage />} />
                <Route path="/ranked" element={<RankedServersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/radio" element={<RadioPage />} />
              </Routes>
            </main>
            
            <Toaster 
              position="top-right" 
              toastOptions={{
                style: {
                  background: '#2D1B4E',
                  color: 'white',
                  border: '1px solid #4C1D95',
                },
              }} 
            />
          </div>
        </Router>
      </MusicProvider>
    </AuthProvider>
  );
}

export default App;