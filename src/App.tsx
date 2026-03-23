/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingBackground } from './components/home/FloatingBackground';
import { RegisterModal } from './components/auth/RegisterModal';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Future } from './pages/Future';
import { LearningTypes } from './pages/LearningTypes';
import { QuizPage } from './pages/QuizPage';

export default function App() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-sky-50 font-sans text-slate-800 overflow-x-hidden relative">
        <FloatingBackground />
        <Navbar onRegisterClick={() => setIsRegisterModalOpen(true)} />
        
        <main>
          <Routes>
            <Route path="/" element={<Home onRegisterClick={() => setIsRegisterModalOpen(true)} />} />
            <Route path="/quienes-somos" element={<About />} />
            <Route path="/futuro" element={<Future />} />
            <Route path="/tipos-aprendizaje" element={<LearningTypes />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </main>

        <Footer />
        <RegisterModal 
          isOpen={isRegisterModalOpen} 
          onClose={() => setIsRegisterModalOpen(false)} 
        />
      </div>
    </Router>
  );
}
