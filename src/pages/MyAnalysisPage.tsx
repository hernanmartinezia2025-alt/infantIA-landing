import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { RotateCcw, LogIn, ClipboardList, Clock } from 'lucide-react';
import { auth, db } from '../firebase';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import {
  PROFILES,
  resolveProfiles,
  type ProfileResult,
  type DimensionScores,
  type Dimension,
  type ProfileId,
} from '../quiz';

// ─── Helpers ─────────────────────────────────────────────────

const DIMENSION_LABELS: Record<Dimension, string> = {
  visual: 'Visual',
  narrativo: 'Narrativo',
  exploratorio: 'Explorador',
  guiado: 'Guiado',
  social: 'Social',
  ritmico: 'Rítmico',
};

const DIMENSION_COLORS: Record<Dimension, string> = {
  visual: '#FF6B35',
  narrativo: '#7C3AED',
  exploratorio: '#0EA5E9',
  guiado: '#10B981',
  social: '#F59E0B',
  ritmico: '#EC4899',
};

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm font-semibold mb-1">
        <span className="text-slate-700">{label}</span>
        <span style={{ color }}>{score}%</span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
}

// ─── Skeleton / Loading ───────────────────────────────────────

function LoadingState() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6" />
        <p className="text-slate-500 font-semibold">Cargando tu análisis…</p>
      </div>
    </div>
  );
}

// ─── No Auth ─────────────────────────────────────────────────

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
          Iniciá sesión para ver tu análisis
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Tu perfil de aprendizaje queda guardado en tu cuenta. Iniciá sesión con Google para acceder a él en cualquier momento.
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

// ─── No Result ───────────────────────────────────────────────

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
          Todavía no completaste el test
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Respondé 15 preguntas rápidas y generamos el perfil de aprendizaje personalizado de tu hijo/a.
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

// ─── Full Analysis Display ────────────────────────────────────

interface AnalysisDisplayProps {
  result: ProfileResult;
  childName: string;
  childAge: number;
  completedAt: Date | null;
}

function AnalysisDisplay({ result, childName, childAge, completedAt }: AnalysisDisplayProps) {
  const { primaryProfile, secondaryProfile, scores, confidence } = result;

  const confidenceLabel = {
    alta: 'Perfil claro y consistente',
    media: 'Perfil con características mixtas (normal en esta etapa)',
    baja: 'Perfil mixto — se adapta a distintos estilos',
  }[confidence];

  const formattedDate = completedAt
    ? completedAt.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">{primaryProfile.icon}</div>
        <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-2">
          Perfil de aprendizaje de {childName} · {childAge} años
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3">
          {primaryProfile.name}
        </h1>
        <p className="text-xl text-slate-600 italic">"{primaryProfile.tagline}"</p>

        {formattedDate && (
          <div className="inline-flex items-center gap-2 mt-4 text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-4 py-2">
            <Clock size={13} />
            Test completado el {formattedDate}
          </div>
        )}
      </div>

      {/* Primary profile card */}
      <div
        className="rounded-3xl p-8 mb-6 text-white shadow-2xl"
        style={{ background: `linear-gradient(135deg, ${primaryProfile.color}ee, ${primaryProfile.color}99)` }}
      >
        <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-2">Perfil principal</p>
        <h2 className="text-3xl font-black mb-3">{primaryProfile.name}</h2>
        <p className="text-white/90 leading-relaxed">{primaryProfile.description}</p>
        <div className="mt-4 inline-block bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
          Confianza: {confidenceLabel}
        </div>
      </div>

      {/* Secondary profile */}
      {secondaryProfile && (
        <div
          className="rounded-2xl p-6 mb-6 border-2"
          style={{ borderColor: secondaryProfile.color + '44', backgroundColor: secondaryProfile.color + '0d' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: secondaryProfile.color }}>
            Perfil secundario
          </p>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{secondaryProfile.icon}</span>
            <div>
              <h3 className="font-black text-lg text-slate-800">{secondaryProfile.name}</h3>
              <p className="text-slate-600 text-sm italic">{secondaryProfile.tagline}</p>
            </div>
          </div>
        </div>
      )}

      {/* Dimension scores */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 mb-6">
        <h3 className="font-black text-xl text-slate-800 mb-6">Mapa de dimensiones</h3>
        {(Object.entries(scores) as [Dimension, number][])
          .sort(([, a], [, b]) => b - a)
          .map(([dim, score]) => (
            <React.Fragment key={dim}>
              <ScoreBar
                label={DIMENSION_LABELS[dim]}
                score={score}
                color={DIMENSION_COLORS[dim]}
              />
            </React.Fragment>
          ))}
      </div>

      {/* Strengths, Challenges, Adaptations */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
          <h4 className="font-black text-emerald-800 mb-3 flex items-center gap-2">
            <span>💪</span> Fortalezas
          </h4>
          <ul className="space-y-2">
            {primaryProfile.strengths.map((s, i) => (
              <li key={i} className="text-sm text-emerald-700 flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5 shrink-0">✓</span> {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
          <h4 className="font-black text-amber-800 mb-3 flex items-center gap-2">
            <span>🧩</span> Desafíos
          </h4>
          <ul className="space-y-2">
            {primaryProfile.challenges.map((c, i) => (
              <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                <span className="text-amber-400 mt-0.5 shrink-0">•</span> {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
          <h4 className="font-black text-indigo-800 mb-3 flex items-center gap-2">
            <span>🚀</span> InfantIA lo adapta
          </h4>
          <ul className="space-y-2">
            {primaryProfile.infantiaAdaptation.map((a, i) => (
              <li key={i} className="text-sm text-indigo-700 flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5 shrink-0">→</span> {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-center text-white mb-6">
        <p className="text-xl font-black mb-2">
          Cuando InfantIA abra sus puertas, el recorrido de {childName} estará pensado exactamente para su forma de aprender.
        </p>
        <p className="text-white/80 text-sm">Tu perfil ya está reservado.</p>
      </div>

      {/* Redo quiz */}
      <div className="text-center mb-10">
        <Link
          to="/quiz"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-all"
        >
          <RotateCcw size={18} /> Volver a hacer el test
        </Link>
        <p className="text-xs text-slate-400 mt-6 max-w-lg mx-auto">
          Este informe ofrece una orientación inicial sobre las preferencias de aprendizaje observadas a partir de las respuestas del adulto responsable.
          No constituye un diagnóstico ni una evaluación psicológica o pedagógica formal.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

type PageState = 'loading' | 'no-auth' | 'no-result' | 'result';

interface StoredAnalysis {
  result: ProfileResult;
  childName: string;
  childAge: number;
  completedAt: Date | null;
}

export function MyAnalysisPage({ onLoginClick }: { onLoginClick: () => void }) {
  const [pageState, setPageState] = useState<PageState>('loading');
  const [analysis, setAnalysis] = useState<StoredAnalysis | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setPageState('no-auth');
        return;
      }

      try {
        // 1. Get the most recent profile for this user
        const profilesQuery = query(
          collection(db, 'profiles'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc'),
          limit(1)
        );
        const profilesSnap = await getDocs(profilesQuery);
        if (profilesSnap.empty) {
          setPageState('no-result');
          return;
        }

        const pd = profilesSnap.docs[0].data();

        // 2. Get the child document for name and age
        const childSnap = await getDoc(doc(db, 'children', pd.childId));
        if (!childSnap.exists()) {
          setPageState('no-result');
          return;
        }
        const childData = childSnap.data();

        // 3. Reconstruct ProfileResult from stored IDs + scores
        const scores = pd.scores as DimensionScores;
        const primaryProfile = PROFILES[pd.primaryProfileId as ProfileId];
        const secondaryProfile = pd.secondaryProfileId
          ? PROFILES[pd.secondaryProfileId as ProfileId]
          : null;
        const result: ProfileResult = {
          primaryProfile,
          secondaryProfile,
          scores,
          confidence: pd.confidence,
        };

        // 4. Parse timestamp if available
        let completedAt: Date | null = null;
        if (pd.createdAt?.toDate) {
          completedAt = pd.createdAt.toDate();
        }

        setAnalysis({
          result,
          childName: childData.name,
          childAge: childData.age,
          completedAt,
        });
        setPageState('result');
      } catch (err) {
        console.warn('Error loading analysis:', err);
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
        {analysis && (
          <AnalysisDisplay
            result={analysis.result}
            childName={analysis.childName}
            childAge={analysis.childAge}
            completedAt={analysis.completedAt}
          />
        )}
      </div>
    </div>
  );
}
