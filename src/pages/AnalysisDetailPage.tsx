import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { RotateCcw, LogIn, Clock, ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
  PROFILES,
  type ProfileResult,
  type DimensionScores,
  type Dimension,
  type ProfileId,
  type AgeRange,
} from '../quiz';

// ─── Helpers ─────────────────────────────────────────────────

const DIMENSION_LABELS: Record<Dimension, string> = {
  creatividad: 'Creatividad',
  logica: 'Lógica',
  social: 'Social',
  analitico: 'Analítico',
  practico: 'Práctico',
  visual: 'Visual',
};

const DIMENSION_COLORS: Record<Dimension, string> = {
  creatividad: '#FF6B35',
  logica: '#0EA5E9',
  social: '#F59E0B',
  analitico: '#7C3AED',
  practico: '#10B981',
  visual: '#EC4899',
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

function LoadingState() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6" />
        <p className="text-slate-500 font-semibold">Cargando el análisis…</p>
      </div>
    </div>
  );
}

function NotFoundState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center"
    >
      <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-xl border border-slate-100 p-10">
        <h1 className="text-2xl font-black text-slate-900 mb-3">Análisis no encontrado</h1>
        <p className="text-slate-500 mb-8">Este análisis no existe o no tenés acceso.</p>
        <Link
          to="/mi-analisis"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-lg px-10 py-3.5 rounded-2xl shadow-xl shadow-indigo-200/50 transition-all transform hover:scale-105 active:scale-95 inline-flex items-center gap-3"
        >
          Ver todos los análisis
        </Link>
      </div>
    </motion.div>
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

// ─── Full Analysis Display ────────────────────────────────────

interface AnalysisDisplayProps {
  result: ProfileResult;
  childName: string;
  childAge: number;
  completedAt: Date | null;
  emailStatus: 'idle' | 'sending' | 'sent' | 'error';
  onSendEmail: () => void;
}

function AnalysisDisplay({ result, childName, childAge, completedAt, emailStatus, onSendEmail }: AnalysisDisplayProps) {
  const { primary, secondary, scores, confidence, ageRange } = result;

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
      {/* Back link */}
      <Link
        to="/mi-analisis"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-6 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all"
      >
        <ArrowLeft size={18} /> Todos los análisis
      </Link>

      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black text-white"
          style={{ backgroundColor: primary.color }}
        >
          {primary.name.charAt(0)}
        </div>
        <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-2">
          Perfil de aprendizaje de {childName} · {ageRange} años
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3">
          {primary.name}
        </h1>
        <p className="text-xl text-slate-600 italic">"{primary.tagline}"</p>

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
        style={{ background: `linear-gradient(135deg, ${primary.color}ee, ${primary.color}99)` }}
      >
        <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-2">Perfil principal</p>
        <h2 className="text-3xl font-black mb-3">{primary.name}</h2>
        <p className="text-white/90 leading-relaxed">{primary.description}</p>
        <div className="mt-4 inline-block bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
          Confianza: {confidenceLabel}
        </div>
      </div>

      {/* Secondary profile */}
      {secondary && (
        <div
          className="rounded-2xl p-6 mb-6 border-2"
          style={{ borderColor: secondary.color + '44', backgroundColor: secondary.color + '0d' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: secondary.color }}>
            Perfil secundario
          </p>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black text-white shrink-0"
              style={{ backgroundColor: secondary.color }}
            >
              {secondary.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-800">{secondary.name}</h3>
              <p className="text-slate-600 text-sm italic">{secondary.tagline}</p>
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
            {primary.strengths.map((s, i) => (
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
            {primary.challenges.map((c, i) => (
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
            {primary.infantiaAdaptation.map((a, i) => (
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

      {/* Debug: Send email */}
      <div className="mb-6">
        {emailStatus === 'idle' && (
          <button
            onClick={onSendEmail}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all"
          >
            <Mail size={18} /> Enviar análisis a mi correo
          </button>
        )}
        {emailStatus === 'sending' && (
          <div className="flex items-center gap-3 bg-sky-50 border border-sky-200 rounded-2xl px-5 py-4 text-sky-700 font-medium">
            <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
            Enviando el análisis a tu correo...
          </div>
        )}
        {emailStatus === 'sent' && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 text-emerald-700 font-medium">
            <CheckCircle size={20} />
            ¡Análisis enviado! Revisá tu correo.
          </div>
        )}
        {emailStatus === 'error' && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 text-amber-700 font-medium">
            <AlertCircle size={20} />
            No se pudo enviar el email.
          </div>
        )}
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

type PageState = 'loading' | 'no-auth' | 'not-found' | 'result';

interface StoredAnalysis {
  result: ProfileResult;
  childName: string;
  childAge: number;
  completedAt: Date | null;
}

export function AnalysisDetailPage({ onLoginClick }: { onLoginClick: () => void }) {
  const { profileId } = useParams<{ profileId: string }>();
  const [pageState, setPageState] = useState<PageState>('loading');
  const [analysis, setAnalysis] = useState<StoredAnalysis | null>(null);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSendEmail = async () => {
    const user = auth.currentUser;
    if (!user?.email || !analysis) return;

    setEmailStatus('sending');
    try {
      const { primary, secondary, scores, confidence, ageRange } = analysis.result;
      const resp = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          childName: analysis.childName,
          childAge: analysis.childAge,
          ageRange,
          primaryProfileName: primary.name,
          primaryProfileTagline: primary.tagline,
          primaryProfileDescription: primary.description,
          primaryProfileColor: primary.color,
          secondaryProfileName: secondary?.name || null,
          strengths: primary.strengths,
          challenges: primary.challenges,
          adaptations: primary.infantiaAdaptation,
          scores,
          confidence,
        }),
      });
      const json = await resp.json();
      if (json.success) {
        setEmailStatus('sent');
      } else {
        throw new Error(json.error || 'unknown');
      }
    } catch (err) {
      console.warn('Email send failed:', err);
      setEmailStatus('error');
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setPageState('no-auth');
        return;
      }

      if (!profileId) {
        setPageState('not-found');
        return;
      }

      try {
        const profileSnap = await getDoc(doc(db, 'profiles', profileId));
        if (!profileSnap.exists()) {
          setPageState('not-found');
          return;
        }

        const pd = profileSnap.data();

        // Verify ownership
        if (pd.userId !== user.uid) {
          setPageState('not-found');
          return;
        }

        const childSnap = await getDoc(doc(db, 'children', pd.childId));
        if (!childSnap.exists()) {
          setPageState('not-found');
          return;
        }
        const childData = childSnap.data();

        const scores = pd.scores as DimensionScores;
        const storedAgeRange = (pd.ageRange || childData.ageRange || '5-6') as AgeRange;
        const primaryProfile = PROFILES[pd.primaryProfileId as ProfileId];
        const secondaryProfile = pd.secondaryProfileId
          ? PROFILES[pd.secondaryProfileId as ProfileId]
          : null;

        const result: ProfileResult = {
          primary: primaryProfile,
          secondary: secondaryProfile,
          scores,
          confidence: pd.confidence,
          ageRange: storedAgeRange,
        };

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
        setPageState('not-found');
      }
    });

    return () => unsubscribe();
  }, [profileId]);

  if (pageState === 'loading') return <LoadingState />;
  if (pageState === 'no-auth') return <NoAuthState onLoginClick={onLoginClick} />;
  if (pageState === 'not-found') return <NotFoundState />;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto">
        {analysis && (
          <AnalysisDisplay
            result={analysis.result}
            childName={analysis.childName}
            childAge={analysis.childAge}
            completedAt={analysis.completedAt}
            emailStatus={emailStatus}
            onSendEmail={handleSendEmail}
          />
        )}
      </div>
    </div>
  );
}
