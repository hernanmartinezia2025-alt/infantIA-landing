import React, { useState, useEffect } from 'react';
import { ClipboardList, Brain, Target, Zap, Check } from 'lucide-react';
import { auth, db, doc, getDoc, setDoc, handleFirestoreError, OperationType } from '../../firebase';

export function LearningProfileSection() {
  const [user, setUser] = useState(auth.currentUser);
  const [learningStyle, setLearningStyle] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadProfile(currentUser.uid);
      } else {
        setLearningStyle('');
      }
    });
    return () => unsubscribe();
  }, []);

  const loadProfile = async (uid: string) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().learningProfile?.learningStyle) {
        setLearningStyle(docSnap.data().learningProfile.learningStyle);
      }
    } catch (error) {
      console.error("Error loading profile", error);
    }
  };

  const handleSaveProfile = async () => {
    if (!user || !learningStyle) return;
    
    setIsSaving(true);
    setSaveSuccess(false);
    
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        await setDoc(userRef, {
          learningProfile: {
            learningStyle: learningStyle
          }
        }, { merge: true });
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section id="tipos-aprendizaje" className="py-24 bg-gradient-to-b from-sky-50 to-white relative z-10">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 md:p-16 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full font-bold mb-6 w-fit">
              <ClipboardList size={18} />
              <span>Test de Perfil de Aprendizaje</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              Descubre cómo aprende mejor tu hijo
            </h2>
            <p className="text-lg text-slate-600 mb-8 font-medium">
              Responde unas breves preguntas sobre tu hijo (de 3 a 7 años) y desbloquea un perfil de aprendizaje personalizado gratis.
            </p>
            
            {user ? (
              <div className="bg-indigo-50 rounded-2xl p-6 mb-8 border border-indigo-100">
                <h3 className="font-bold text-slate-800 mb-4">Guardar Perfil de Aprendizaje</h3>
                <p className="text-sm text-slate-600 mb-4">Selecciona el estilo principal de tu hijo para personalizar su experiencia en InfantIA:</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {['Visual', 'Auditivo', 'Kinestésico'].map((style) => (
                    <button
                      key={style}
                      onClick={() => setLearningStyle(style)}
                      className={`py-2 px-4 rounded-xl font-bold text-sm transition-all ${
                        learningStyle === style 
                          ? 'bg-indigo-600 text-white shadow-md' 
                          : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={handleSaveProfile}
                  disabled={!learningStyle || isSaving}
                  className="bg-indigo-600 disabled:bg-indigo-300 hover:bg-indigo-700 text-white font-black py-3 px-6 rounded-full shadow-md transition-transform hover:scale-105 flex items-center justify-center gap-2 text-sm w-full"
                >
                  {isSaving ? 'Guardando...' : saveSuccess ? <><Check size={18} /> ¡Guardado!</> : 'Guardar Perfil'}
                </button>
              </div>
            ) : (
              <div className="bg-amber-50 rounded-2xl p-6 mb-8 border border-amber-100">
                <p className="text-amber-800 font-medium">
                  Inicia sesión para guardar el perfil de aprendizaje de tu hijo y recibir recomendaciones personalizadas.
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600 h-fit">
                  <Brain size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-1">Perfil Personalizado</h4>
                  <p className="text-slate-600">Conoce su estilo de aprendizaje, fortalezas y áreas de crecimiento con nuestra evaluación experta.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600 h-fit">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-1">Actividades a Medida</h4>
                  <p className="text-slate-600">Recibe juegos, proyectos creativos y recomendaciones adaptadas a su ritmo.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 bg-indigo-50 relative min-h-[400px]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 lg:bg-gradient-to-r lg:from-white lg:via-white/20 lg:to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
