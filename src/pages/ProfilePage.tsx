import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Users, Crown, Calendar, ChevronRight, LogIn } from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { User } from 'firebase/auth';

interface ChildInfo {
  id: string;
  name: string;
  age: number;
  ageRange: string;
}

function LoadingState() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6" />
        <p className="text-slate-500 font-semibold">Cargando tu perfil…</p>
      </div>
    </div>
  );
}

function NoAuthState({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center"
    >
      <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-xl border border-slate-100 p-10">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <LogIn size={36} className="text-indigo-500" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-3">
          Iniciá sesión para ver tu perfil
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Accedé a tu cuenta para ver tu información y la de tus hijos.
        </p>
        <button
          onClick={onLoginClick}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-lg px-10 py-3.5 rounded-2xl shadow-xl shadow-indigo-200/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
        >
          <LogIn size={20} /> Iniciar sesión
        </button>
      </div>
    </motion.div>
  );
}

function ProfileDisplay({ user, children }: { user: User; children: ChildInfo[] }) {
  const creationDate = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      {/* Profile header card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-6 text-center">
        <img
          src={user.photoURL || ''}
          alt={user.displayName || 'Usuario'}
          className="w-24 h-24 rounded-full border-4 border-indigo-200 mx-auto mb-4 shadow-lg"
          referrerPolicy="no-referrer"
        />
        <h1 className="text-3xl font-black text-slate-900 mb-1">
          {user.displayName || 'Usuario'}
        </h1>
        <div className="flex items-center justify-center gap-2 text-slate-500">
          <Mail size={16} />
          <span className="text-sm font-medium">{user.email}</span>
        </div>
        {creationDate && (
          <div className="flex items-center justify-center gap-2 text-slate-400 mt-2">
            <Calendar size={14} />
            <span className="text-xs">Miembro desde {creationDate}</span>
          </div>
        )}
      </div>

      {/* Subscription tier */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border border-amber-200 p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
            <Crown size={28} className="text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">
              Plan actual
            </p>
            <h3 className="text-xl font-black text-slate-900">Plan Gratuito</h3>
            <p className="text-sm text-slate-500 mt-1">
              Acceso al test de perfil de aprendizaje.
            </p>
          </div>
          <div className="shrink-0 hidden sm:block">
            <span className="bg-amber-200/60 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full">
              Próximamente más planes
            </span>
          </div>
        </div>
      </div>

      {/* Waiting list badge */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 mb-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
            <span className="text-2xl">🚀</span>
          </div>
          <div>
            <h3 className="text-lg font-black mb-1">Tu lugar está reservado</h3>
            <p className="text-white/85 text-sm leading-relaxed">
              Estás en la lista de acceso anticipado de InfantIA. Cuando lancemos la plataforma completa, serás de los primeros en descubrir una experiencia de aprendizaje diseñada a medida para tu familia.
            </p>
          </div>
        </div>
      </div>

      {/* Children */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
            <Users size={20} className="text-indigo-600" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Mis hijos</h2>
        </div>

        {children.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-slate-400 mb-4">
              Todavía no hay niños asociados a tu cuenta.
            </p>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Hacer el test
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {children.map((child) => (
              <Link
                key={child.id}
                to="/mi-analisis"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition-all group"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-lg font-black text-indigo-600 shrink-0">
                  {child.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 truncate">{child.name}</p>
                  <p className="text-sm text-slate-500">
                    {child.age} años · Rango {child.ageRange}
                  </p>
                </div>
                <ChevronRight
                  size={20}
                  className="text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0"
                />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          to="/quiz"
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md hover:border-indigo-200 transition-all group text-center"
        >
          <p className="text-2xl mb-2">🧠</p>
          <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            Hacer un nuevo test
          </p>
          <p className="text-xs text-slate-400 mt-1">Agregá otro hijo o repetí el test</p>
        </Link>
        <Link
          to="/mi-analisis"
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md hover:border-purple-200 transition-all group text-center"
        >
          <p className="text-2xl mb-2">✨</p>
          <p className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
            Ver análisis
          </p>
          <p className="text-xs text-slate-400 mt-1">Revisá el perfil de aprendizaje</p>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

type PageState = 'loading' | 'no-auth' | 'ready';

export function ProfilePage({ onLoginClick }: { onLoginClick: () => void }) {
  const [pageState, setPageState] = useState<PageState>('loading');
  const [user, setUser] = useState<User | null>(null);
  const [children, setChildren] = useState<ChildInfo[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        setPageState('no-auth');
        return;
      }

      setUser(currentUser);

      try {
        const childrenQuery = query(
          collection(db, 'children'),
          where('userId', '==', currentUser.uid)
        );
        const snap = await getDocs(childrenQuery);
        const kids: ChildInfo[] = snap.docs.map((d) => ({
          id: d.id,
          name: d.data().name,
          age: d.data().age,
          ageRange: d.data().ageRange,
        }));
        setChildren(kids);
      } catch (err) {
        console.warn('Error loading children:', err);
      }

      setPageState('ready');
    });

    return () => unsubscribe();
  }, []);

  if (pageState === 'loading') return <LoadingState />;
  if (pageState === 'no-auth') return <NoAuthState onLoginClick={onLoginClick} />;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto">
        {user && <ProfileDisplay user={user} children={children} />}
      </div>
    </div>
  );
}
