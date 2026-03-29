import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, ClipboardList, Clock, ChevronRight, Brain } from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import {
  PROFILES,
  type ProfileId,
} from '../quiz';

// ─── Types ───────────────────────────────────────────────────

interface ChildData {
  id: string;
  name: string;
  age: number;
  ageRange: string;
}

interface AnalysisSummary {
  id: string;
  childId: string;
  primaryProfileId: ProfileId;
  secondaryProfileId: ProfileId | null;
  confidence: 'alta' | 'media' | 'baja';
  completedAt: Date | null;
}

interface ChildWithAnalyses {
  child: ChildData;
  analyses: AnalysisSummary[];
}

// ─── Sub-components ──────────────────────────────────────────

function LoadingState() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6" />
        <p className="text-slate-500 font-semibold">Cargando tus análisis…</p>
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
          Iniciá sesión para ver tus análisis
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Los perfiles de aprendizaje quedan guardados en tu cuenta. Iniciá sesión con Google para acceder a ellos en cualquier momento.
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

function NoResultState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center"
    >
      <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-xl border border-slate-100 p-10">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ClipboardList size={36} className="text-amber-500" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-3">
          Todavía no completaste ningún test
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Respondé unas preguntas rápidas y generamos el perfil de aprendizaje personalizado de tu hijo/a.
        </p>
        <Link
          to="/quiz"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-lg px-10 py-3.5 rounded-2xl shadow-xl shadow-indigo-200/50 transition-all transform hover:scale-105 active:scale-95 inline-flex items-center gap-3"
        >
          🧠 Hacer el test ahora
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Analysis Card ───────────────────────────────────────────

function AnalysisCard({ analysis }: { analysis: AnalysisSummary }) {
  const primary = PROFILES[analysis.primaryProfileId];
  const secondary = analysis.secondaryProfileId ? PROFILES[analysis.secondaryProfileId] : null;

  const formattedDate = analysis.completedAt
    ? analysis.completedAt.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  const confidenceLabel = {
    alta: 'Alta',
    media: 'Media',
    baja: 'Baja',
  }[analysis.confidence];

  return (
    <Link
      to={`/mi-analisis/${analysis.id}`}
      className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all group"
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black text-white shrink-0"
        style={{ backgroundColor: primary.color }}
      >
        {primary.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-slate-800 truncate">{primary.name}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
          {secondary && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: secondary.color + '1a', color: secondary.color }}>
              + {secondary.name}
            </span>
          )}
          <span className="text-xs text-slate-400">
            Confianza: {confidenceLabel}
          </span>
          {formattedDate && (
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock size={11} /> {formattedDate}
            </span>
          )}
        </div>
      </div>
      <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0" />
    </Link>
  );
}

// ─── Listing Display ─────────────────────────────────────────

function AnalysisListing({ groups }: { groups: ChildWithAnalyses[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain size={32} className="text-indigo-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
          Tus análisis
        </h1>
        <p className="text-slate-500">
          Todos los perfiles de aprendizaje de tus hijos en un solo lugar.
        </p>
      </div>

      <div className="space-y-8">
        {groups.map(({ child, analyses }) => (
          <div key={child.id} className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
            {/* Child header */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-xl font-black text-indigo-600 shrink-0">
                {child.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">{child.name}</h2>
                <p className="text-sm text-slate-500">{child.age} años · Rango {child.ageRange}</p>
              </div>
              <span className="ml-auto bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full hidden sm:inline-block">
                {analyses.length} {analyses.length === 1 ? 'análisis' : 'análisis'}
              </span>
            </div>

            {/* Analysis list */}
            <div className="space-y-3">
              {analyses.map((a) => (
                <React.Fragment key={a.id}>
                  <AnalysisCard analysis={a} />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          to="/quiz"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-lg px-10 py-3.5 rounded-2xl shadow-xl shadow-indigo-200/50 transition-all transform hover:scale-105 active:scale-95 inline-flex items-center gap-3"
        >
          🧠 Hacer un nuevo test
        </Link>
        <p className="text-xs text-slate-400 mt-4">
          Podés repetir el test o agregar otro hijo en cualquier momento.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

type PageState = 'loading' | 'no-auth' | 'no-result' | 'result';

export function MyAnalysisPage({ onLoginClick }: { onLoginClick: () => void }) {
  const [pageState, setPageState] = useState<PageState>('loading');
  const [groups, setGroups] = useState<ChildWithAnalyses[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setPageState('no-auth');
        return;
      }

      try {
        // 1. Fetch all children for this user
        const childrenSnap = await getDocs(
          query(collection(db, 'children'), where('userId', '==', user.uid))
        );
        const childrenMap = new Map<string, ChildData>();
        childrenSnap.docs.forEach((d) => {
          const data = d.data();
          childrenMap.set(d.id, {
            id: d.id,
            name: data.name,
            age: data.age,
            ageRange: data.ageRange,
          });
        });

        // 2. Fetch all profiles for this user, ordered by date
        const profilesSnap = await getDocs(
          query(
            collection(db, 'profiles'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
          )
        );

        if (profilesSnap.empty) {
          setPageState('no-result');
          return;
        }

        // 3. Group profiles by child
        const groupMap = new Map<string, AnalysisSummary[]>();
        profilesSnap.docs.forEach((d) => {
          const pd = d.data();
          const summary: AnalysisSummary = {
            id: d.id,
            childId: pd.childId,
            primaryProfileId: pd.primaryProfileId as ProfileId,
            secondaryProfileId: pd.secondaryProfileId ? (pd.secondaryProfileId as ProfileId) : null,
            confidence: pd.confidence,
            completedAt: pd.createdAt?.toDate?.() ?? null,
          };
          const existing = groupMap.get(pd.childId) || [];
          existing.push(summary);
          groupMap.set(pd.childId, existing);
        });

        // 4. Build final grouped array
        const result: ChildWithAnalyses[] = [];
        groupMap.forEach((analyses, childId) => {
          const child = childrenMap.get(childId);
          if (child) {
            result.push({ child, analyses });
          }
        });

        if (result.length === 0) {
          setPageState('no-result');
          return;
        }

        setGroups(result);
        setPageState('result');
      } catch (err) {
        console.warn('Error loading analyses:', err);
        setPageState('no-result');
      }
    });

    return () => unsubscribe();
  }, []);

  if (pageState === 'loading') return <LoadingState />;
  if (pageState === 'no-auth') return <NoAuthState onLoginClick={onLoginClick} />;
  if (pageState === 'no-result') return <NoResultState />;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto">
        <AnalysisListing groups={groups} />
      </div>
    </div>
  );
}
