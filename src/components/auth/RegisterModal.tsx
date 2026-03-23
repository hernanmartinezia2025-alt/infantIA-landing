import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { auth, signInWithPopup, googleProvider, db, doc, setDoc, getDoc } from '../../firebase';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleGoogleSignIn = async () => {
    if (!childName.trim()) {
      setValidationError('Por favor, ingresa el nombre del niño/a.');
      return;
    }
    if (!childAge) {
      setValidationError('Por favor, selecciona la edad.');
      return;
    }
    
    setValidationError('');
    setIsLoading(true);
    try {
      // Step 1: Google Auth (critical)
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;

      // Step 2: Firestore profile save (non-critical — won't block sign-in)
      try {
        const userRef = doc(db, 'users', loggedInUser.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: loggedInUser.uid,
            email: loggedInUser.email,
            displayName: loggedInUser.displayName,
            photoURL: loggedInUser.photoURL,
            role: 'user',
            childName: childName.trim(),
            childAge: parseInt(childAge, 10),
            createdAt: new Date()
          });
        } else {
          await setDoc(userRef, {
            childName: childName.trim(),
            childAge: parseInt(childAge, 10),
          }, { merge: true });
        }
      } catch (firestoreError) {
        // Firestore unavailable (ad blocker, DB not created, offline)
        // Auth already succeeded — profile will sync later
        console.warn("Could not save profile to Firestore. Sign-in still succeeded.", firestoreError);
      }

      onClose();
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log("Sign-in popup closed by user.");
      } else {
        console.error("Error signing in with Google", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white text-center relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-black mb-1">¡Únete a Infantia KIDS!</h2>
              <p className="text-indigo-100 font-medium text-sm">Crea una cuenta para empezar la aventura</p>
            </div>
            
            <div className="p-8 flex flex-col items-center justify-center space-y-6">
              <p className="text-center text-slate-600 font-medium">
                Crea el perfil de aprendizaje de tu hijo/a antes de iniciar sesión.
              </p>

              <div className="w-full space-y-4">
                <div>
                  <label htmlFor="childName" className="block text-sm font-bold text-slate-700 mb-1">Nombre del niño/a</label>
                  <input 
                    type="text" 
                    id="childName"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Ej. Mateo"
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="childAge" className="block text-sm font-bold text-slate-700 mb-1">Edad</label>
                  <select 
                    id="childAge"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors bg-white"
                  >
                    <option value="" disabled>Selecciona una edad</option>
                    <option value="3">3 años</option>
                    <option value="4">4 años</option>
                    <option value="5">5 años</option>
                    <option value="6">6 años</option>
                    <option value="7">7 años</option>
                  </select>
                </div>
                
                {validationError && (
                  <p className="text-red-500 text-sm font-medium text-center">{validationError}</p>
                )}
              </div>
              
              <button 
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-white border-2 border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isLoading ? 'Conectando...' : 'Continuar con Google'}
              </button>
              
              <p className="text-center text-xs text-slate-500 mt-4">
                Al registrarte, aceptas nuestros Términos de Servicio y Política de Privacidad.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
