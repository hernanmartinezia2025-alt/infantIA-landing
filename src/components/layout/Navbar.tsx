import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, LogOut, Menu, X } from 'lucide-react';
import { auth, signOut } from '../../firebase';
import { User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar({ onRegisterClick }: { onRegisterClick: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="fixed w-full top-0 left-0 pt-4 md:pt-6 px-4 md:px-6 z-50 pointer-events-none">
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm pointer-events-auto lg:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>
      
      <nav 
        className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center bg-white/80 backdrop-blur-xl border border-white/80 shadow-sm rounded-2xl pointer-events-auto relative z-10"
      >
        <Link to="/" onClick={closeMobileMenu} className="flex items-center hover:opacity-80 transition-opacity cursor-pointer shrink-0">
          <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Infantia</span>
          <span className="text-sm md:text-base font-black flex ml-0.5 mt-3 md:mt-4">
            <span className="text-blue-600">K</span>
            <span className="text-red-500">I</span>
            <span className="text-green-500">D</span>
            <span className="text-yellow-400">S</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-2 xl:gap-6 font-semibold text-slate-600 text-sm xl:text-base">
          <Link to="/quienes-somos" className="hover:text-indigo-600 hover:bg-indigo-50/80 px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap">
            Quiénes somos
          </Link>
          <Link to="/futuro" className="hover:text-indigo-600 hover:bg-indigo-50/80 px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap">
            El futuro de InfantIA
          </Link>
          <Link to="/tipos-aprendizaje" className="hover:text-indigo-600 hover:bg-indigo-50/80 px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap">
            Tipos de aprendizaje
          </Link>
          <Link to="/quiz" className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap font-bold shadow-sm">
            🧠 Hacer el Test
          </Link>
          {user && (
            <Link to="/mi-analisis" className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap font-bold border border-purple-200">
              ✨ Tu Análisis
            </Link>
          )}
          
          <div className="flex items-center gap-4 ml-2 xl:ml-4 border-l-2 border-slate-200 pl-6 xl:pl-8 pr-4 xl:pr-6 border-r-2">
            <a href="#" className="text-slate-400 hover:text-pink-500 hover:scale-110 transition-all" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-600 hover:scale-110 transition-all" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-sky-500 hover:scale-110 transition-all" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-red-600 hover:scale-110 transition-all" aria-label="YouTube">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto lg:ml-4 shrink-0">
          {user && (
            <div className="flex items-center gap-3">
              <Link to="/perfil" className="hover:opacity-80 transition-opacity">
                <img src={user.photoURL || ''} alt={user.displayName || 'User'} className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-indigo-200 hover:border-indigo-400 transition-colors" referrerPolicy="no-referrer" />
              </Link>
              <button
                onClick={handleLogout}
                className="hidden lg:block text-slate-500 hover:text-slate-800 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
          
          <div className="hidden lg:flex items-center gap-3">
            {!user && (
              <button 
                onClick={onRegisterClick}
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold py-2.5 px-5 rounded-full shadow-sm transition-transform hover:scale-105 text-sm whitespace-nowrap"
              >
                Iniciar Sesión
              </button>
            )}
          </div>

          <button 
            className="lg:hidden p-2 -mr-2 text-slate-600 hover:text-slate-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 w-full mt-3 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-5 flex flex-col gap-4 lg:hidden pointer-events-auto origin-top"
            >
              <div className="flex flex-col gap-3 font-semibold text-slate-700">
                <Link to="/quienes-somos" onClick={closeMobileMenu} className="hover:text-indigo-600 hover:bg-indigo-50/80 p-3 rounded-xl transition-all duration-200">
                  Quiénes somos
                </Link>
                <Link to="/futuro" onClick={closeMobileMenu} className="hover:text-indigo-600 hover:bg-indigo-50/80 p-3 rounded-xl transition-all duration-200">
                  El futuro de InfantIA
                </Link>
                <Link to="/tipos-aprendizaje" onClick={closeMobileMenu} className="hover:text-indigo-600 hover:bg-indigo-50/80 p-3 rounded-xl transition-all duration-200">
                  Tipos de aprendizaje
                </Link>
                <Link to="/quiz" onClick={closeMobileMenu} className="bg-indigo-600 text-white p-3 rounded-xl transition-all duration-200 font-bold text-center">
                  🧠 Hacer el Test
                </Link>
                {user && (
                  <Link to="/mi-analisis" onClick={closeMobileMenu} className="bg-purple-50 text-purple-700 border border-purple-200 p-3 rounded-xl transition-all duration-200 font-bold text-center">
                    ✨ Tu Análisis
                  </Link>
                )}
              </div>
              
              <hr className="border-slate-100" />
              
              <div className="flex items-center justify-center gap-6 p-2">
                <a href="#" className="text-slate-400 hover:text-pink-500 transition-all" aria-label="Instagram">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-600 transition-all" aria-label="Facebook">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-slate-400 hover:text-sky-500 transition-all" aria-label="Twitter">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-slate-400 hover:text-red-600 transition-all" aria-label="YouTube">
                  <Youtube size={24} />
                </a>
              </div>

              <hr className="border-slate-100" />

              <div className="flex flex-col gap-3 pt-2">
                {user ? (
                  <button 
                    onClick={() => { handleLogout(); closeMobileMenu(); }} 
                    className="flex items-center justify-center gap-2 text-slate-600 font-bold py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <LogOut size={20} /> Cerrar sesión
                  </button>
                ) : (
                  <button 
                    onClick={() => { onRegisterClick(); closeMobileMenu(); }} 
                    className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold py-3 px-5 rounded-xl text-center transition-colors"
                  >
                    Iniciar Sesión
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
