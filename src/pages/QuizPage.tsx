import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, RotateCcw, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { auth, db, doc, setDoc, collection } from '../firebase';
import { serverTimestamp, orderBy, limit, query, where, getDocs } from 'firebase/firestore';
import {
  PROFILES,
  QUESTIONS_BY_AGE_RANGE,
  calculateScores,
  resolveProfiles,
  getAgeRange,
  type AnswerValue,
  type ProfileResult,
  type DimensionScores,
  type Dimension,
  type AgeRange,
  type Question,
} from '../quiz';

// ─── Types ───────────────────────────────────────────────────

type Phase = 'intro' | 'questions' | 'results';

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

// ─── Sub-components ──────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm font-semibold text-slate-500 mb-2">
        <span>Pregunta {current} de {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

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

// ─── Phase 1: Intro ──────────────────────────────────────────

function IntroPhase({
  childName, setChildName,
  childAge, setChildAge,
  onStart, onDebugComplete, isLoggedIn, prefilled
}: {
  childName: string; setChildName: (v: string) => void;
  childAge: string; setChildAge: (v: string) => void;
  onStart: () => void; onDebugComplete: () => void; isLoggedIn: boolean; prefilled: boolean;
}) {
  const ageNum = childAge ? parseInt(childAge, 10) : null;
  const ageRange = ageNum ? getAgeRange(ageNum) : null;
  const canStart = childName.trim().length > 0 && ageRange !== null;
  const questionCount = ageRange ? QUESTIONS_BY_AGE_RANGE[ageRange].length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="text-7xl mb-6">🧒</div>
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
        Descubrí el perfil de aprendizaje de tu hijo
      </h1>
      <p className="text-lg text-slate-600 mb-10 leading-relaxed">
        Respondé unas preguntas rápidas y generamos un análisis personalizado
        del estilo de aprendizaje de tu hijo/a. Sin registrarte, sin pagar — gratis ahora.
      </p>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-8 text-left">
        <h2 className="text-xl font-black text-slate-800 mb-5">
          {prefilled ? '¡Hola de nuevo!' : 'Antes de empezar'}
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="childName" className="block text-sm font-bold text-slate-700 mb-1">
              Nombre del niño/a
            </label>
            <input
              id="childName"
              type="text"
              value={childName}
              onChange={e => setChildName(e.target.value)}
              placeholder="Ej. Mateo"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors font-medium"
            />
          </div>

          <div>
            <label htmlFor="childAge" className="block text-sm font-bold text-slate-700 mb-1">
              Edad
            </label>
            <select
              id="childAge"
              value={childAge}
              onChange={e => setChildAge(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors bg-white font-medium"
            >
              <option value="" disabled>Seleccioná una edad</option>
              {[3, 4, 5, 6, 7, 8, 9, 10].map(age => (
                <option key={age} value={String(age)}>{age} años</option>
              ))}
            </select>
          </div>

          {ageRange && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 text-sm text-indigo-700">
              Rango etario: <strong>{ageRange} años</strong> — {questionCount} preguntas adaptadas a esta edad.
            </div>
          )}
        </div>

        {!isLoggedIn && (
          <p className="mt-4 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <strong>Iniciá sesión</strong> para que el resultado quede guardado en tu cuenta y puedas consultarlo después.
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-6 text-sm text-slate-500 mb-8">
        <div className="flex items-center gap-2"><span className="text-xl">⏱️</span> ~3 minutos</div>
        <div className="flex items-center gap-2"><span className="text-xl">💬</span> {questionCount > 0 ? `${questionCount} preguntas` : 'Preguntas adaptadas'}</div>
        <div className="flex items-center gap-2"><span className="text-xl">🎯</span> Resultado inmediato</div>
      </div>

      <button
        onClick={onStart}
        disabled={!canStart}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xl px-12 py-4 rounded-2xl shadow-xl shadow-indigo-200/50 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3 mx-auto"
      >
        Comenzar el test <ChevronRight size={24} />
      </button>

      {/* ── DEBUG ONLY — remove before production ── */}
      <button
        onClick={onDebugComplete}
        className="mt-6 text-xs text-slate-400 hover:text-red-500 underline underline-offset-2 transition-colors"
      >
        [DEBUG] Auto-completar quiz (valor 2, sin guardar en DB)
      </button>
    </motion.div>
  );
}

// ─── Phase 2: Questions ──────────────────────────────────────

function QuestionsPhase({
  questions, answers, onAnswer, currentIndex, setCurrentIndex, onFinish
}: {
  questions: Question[];
  answers: Record<string, AnswerValue>;
  onAnswer: (id: string, value: AnswerValue) => void;
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  onFinish: () => void;
}) {
  const question = questions[currentIndex];
  const selectedValue = answers[question.id];
  const isLast = currentIndex === questions.length - 1;
  const isFirst = currentIndex === 0;

  const labels = question.scaleLabels || ["Casi nunca", "A veces", "Seguido", "Casi siempre"];

  const answerColors = [
    'hover:border-rose-400 hover:bg-rose-50 data-[selected=true]:border-rose-400 data-[selected=true]:bg-rose-50 data-[selected=true]:text-rose-700',
    'hover:border-amber-400 hover:bg-amber-50 data-[selected=true]:border-amber-400 data-[selected=true]:bg-amber-50 data-[selected=true]:text-amber-700',
    'hover:border-sky-400 hover:bg-sky-50 data-[selected=true]:border-sky-400 data-[selected=true]:bg-sky-50 data-[selected=true]:text-sky-700',
    'hover:border-emerald-400 hover:bg-emerald-50 data-[selected=true]:border-emerald-400 data-[selected=true]:bg-emerald-50 data-[selected=true]:text-emerald-700',
  ];

  const answerEmojis = ['😐', '🙂', '😊', '😄'];

  const handleNext = () => {
    if (isLast) onFinish();
    else setCurrentIndex(currentIndex + 1);
  };

  return (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-6">
        <p className="text-2xl font-bold text-slate-800 leading-snug mb-2">{question.text}</p>
        {question.subtext && (
          <p className="text-sm text-slate-500 italic mb-6">{question.subtext}</p>
        )}
        {!question.subtext && <div className="mb-6" />}

        <div className="grid grid-cols-2 gap-3">
          {labels.map((label, i) => {
            const value = (i + 1) as AnswerValue;
            const isSelected = selectedValue === value;
            return (
              <button
                key={i}
                data-selected={isSelected}
                onClick={() => onAnswer(question.id, value)}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-slate-200 font-bold transition-all duration-150 transform hover:scale-[1.02] active:scale-95 text-slate-600 ${answerColors[i]} ${isSelected ? 'scale-[1.02] shadow-md' : ''}`}
              >
                <span className="text-2xl">{answerEmojis[i]}</span>
                <span className="text-sm text-center leading-tight">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={isFirst}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold py-3 px-5 rounded-xl hover:bg-slate-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} /> Anterior
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedValue}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-indigo-200/50 transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLast ? 'Ver resultado' : 'Siguiente'} <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Phase 3: Results ────────────────────────────────────────

function ResultsPhase({
  result, childName, isSaving, saveError, emailStatus, onSendEmail, onReset
}: {
  result: ProfileResult;
  childName: string;
  isSaving: boolean;
  saveError: string | null;
  emailStatus: 'idle' | 'sending' | 'sent' | 'error';
  onSendEmail: () => void;
  onReset: () => void;
}) {
  const { primary, secondary, scores, confidence, ageRange } = result;

  const confidenceLabel = {
    alta: 'Perfil claro y consistente',
    media: 'Perfil con características mixtas (normal en esta etapa)',
    baja: 'Perfil mixto — se adapta a distintos estilos',
  }[confidence];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
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
      </div>

      {/* Save status */}
      {isSaving && (
        <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-2xl px-5 py-4 mb-4 text-indigo-700 font-medium">
          <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          Guardando resultado en tu perfil...
        </div>
      )}
      {!isSaving && !saveError && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 mb-4 text-emerald-700 font-medium">
          <CheckCircle size={20} />
          Resultado guardado correctamente.
        </div>
      )}
      {saveError && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-4 text-amber-700 font-medium">
          <AlertCircle size={20} />
          {saveError}
        </div>
      )}

      {/* Email send button / status */}
      {emailStatus === 'idle' && (
        <button
          onClick={onSendEmail}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all mb-6"
        >
          <Mail size={18} /> Enviar análisis a mi correo
        </button>
      )}
      {emailStatus === 'sending' && (
        <div className="flex items-center gap-3 bg-sky-50 border border-sky-200 rounded-2xl px-5 py-4 mb-6 text-sky-700 font-medium">
          <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
          Enviando el análisis a tu correo...
        </div>
      )}
      {emailStatus === 'sent' && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 mb-6 text-emerald-700 font-medium">
          <CheckCircle size={20} />
          ¡Análisis enviado! Revisá tu correo.
        </div>
      )}
      {emailStatus === 'error' && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-6 text-amber-700 font-medium">
          <AlertCircle size={20} />
          No se pudo enviar el email, pero el análisis está guardado en tu cuenta.
        </div>
      )}

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
            <ScoreBar
              key={dim}
              label={DIMENSION_LABELS[dim]}
              score={score}
              color={DIMENSION_COLORS[dim]}
            />
          ))}
      </div>

      {/* Strengths, Challenges, Recommendations */}
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

      {/* CTA + reset */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-center text-white mb-6">
        <p className="text-xl font-black mb-2">
          Cuando InfantIA abra sus puertas, el recorrido de {childName} estará pensado exactamente para su forma de aprender.
        </p>
        <p className="text-white/80 text-sm">Guardamos tu perfil para cuando estés listo/a.</p>
      </div>

      <div className="text-center mb-10">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-all mx-auto"
        >
          <RotateCcw size={18} /> Hacer el test de nuevo
        </button>
        <p className="text-xs text-slate-400 mt-6 max-w-lg mx-auto">
          Este informe ofrece una orientación inicial sobre las preferencias de aprendizaje observadas a partir de las respuestas del adulto responsable.
          No constituye un diagnóstico ni una evaluación psicológica o pedagógica formal.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main QuizPage ───────────────────────────────────────────

export function QuizPage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [ageRange, setAgeRange] = useState<AgeRange | null>(null);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<ProfileResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [prefilled, setPrefilled] = useState(false);

  // Pre-fill from the user's first child if logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'children'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'asc'),
          limit(1)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const child = snap.docs[0].data();
          if (child.name) { setChildName(child.name); setPrefilled(true); }
          if (child.age)  { setChildAge(String(child.age)); }
        }
      } catch { /* Firestore may be unavailable */ }
    });
    return () => unsubscribe();
  }, []);

  const handleStart = () => {
    const age = parseInt(childAge, 10);
    const range = getAgeRange(age);
    if (!range) return;

    setAgeRange(range);
    setAnswers({});
    setCurrentIndex(0);
    setPhase('questions');
  };

  // ── DEBUG ONLY — remove before production ──
  const handleDebugComplete = () => {
    const name = childName.trim() || 'Debug';
    const age = parseInt(childAge, 10) || 5;
    const range = getAgeRange(age) || '5-6';

    setChildName(name);
    setChildAge(String(age));
    setAgeRange(range);

    const questions = QUESTIONS_BY_AGE_RANGE[range];
    const debugAnswers: Record<string, AnswerValue> = {};
    questions.forEach(q => { debugAnswers[q.id] = 2; });

    setAnswers(debugAnswers);

    const scores = calculateScores({ ageRange: range, answers: debugAnswers, questions });
    const profileResult = resolveProfiles(scores, range);
    setResult(profileResult);
    setPhase('results');
    // Intentionally skipping saveResult — debug mode
  };

  const handleAnswer = (id: string, value: AnswerValue) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleFinish = async () => {
    if (!ageRange) return;
    const questions = QUESTIONS_BY_AGE_RANGE[ageRange];
    const scores = calculateScores({ ageRange, answers, questions });
    const profileResult = resolveProfiles(scores, ageRange);
    setResult(profileResult);
    setPhase('results');
    await saveResult(profileResult, scores);
  };

  const saveResult = async (profileResult: ProfileResult, scores: DimensionScores) => {
    const user = auth.currentUser;
    if (!user || !ageRange) return;

    setIsSaving(true);
    setSaveError(null);
    try {
      const childRef = doc(collection(db, 'children'));
      await setDoc(childRef, {
        userId: user.uid,
        name: childName.trim(),
        age: parseInt(childAge, 10),
        ageRange,
        createdAt: serverTimestamp(),
      });

      const newDocRef = doc(collection(db, 'profiles'));
      await setDoc(newDocRef, {
        userId: user.uid,
        childId: childRef.id,
        ageRange,
        answers,
        scores,
        primaryProfileId: profileResult.primary.id,
        secondaryProfileId: profileResult.secondary?.id || null,
        confidence: profileResult.confidence,
        createdAt: serverTimestamp(),
        scoringVersion: '2.0',
      });
    } catch (err) {
      console.warn('Firestore save failed:', err);
      setSaveError('No se pudo guardar el resultado en la nube. El análisis es válido de todas formas.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendEmail = async () => {
    const user = auth.currentUser;
    if (!user?.email || !result || !ageRange) return;

    setEmailStatus('sending');
    try {
      const { primary, secondary, confidence, scores } = result;
      const resp = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          childName: childName.trim(),
          childAge: parseInt(childAge, 10),
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

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setAgeRange(null);
    setSaveError(null);
    setEmailStatus('idle');
    setPhase('intro');
  };

  const currentQuestions = ageRange ? QUESTIONS_BY_AGE_RANGE[ageRange] : [];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <IntroPhase
              key="intro"
              childName={childName}
              setChildName={setChildName}
              childAge={childAge}
              setChildAge={setChildAge}
              onStart={handleStart}
              onDebugComplete={handleDebugComplete}
              isLoggedIn={!!auth.currentUser}
              prefilled={prefilled}
            />
          )}

          {phase === 'questions' && (
            <QuestionsPhase
              key="questions"
              questions={currentQuestions}
              answers={answers}
              onAnswer={handleAnswer}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              onFinish={handleFinish}
            />
          )}

          {phase === 'results' && result && (
            <ResultsPhase
              key="results"
              result={result}
              childName={childName}
              isSaving={isSaving}
              saveError={saveError}
              emailStatus={emailStatus}
              onSendEmail={handleSendEmail}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
