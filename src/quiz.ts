// ============================================================
// INFANTIA — SISTEMA DE PERFIL DE APRENDIZAJE
// Basado en infantia-core.ts v1.0
// Client-safe version (no FirebaseFirestore server types)
// ============================================================

// ─── BASE TYPES ─────────────────────────────────────────────

// Los 6 perfiles — nombres internos (nunca cambian)
export type ProfileId =
  | "explorador_creativo"
  | "pensador_logico"
  | "comunicador_social"
  | "observador_analitico"
  | "constructor_practico"
  | "aprendiz_visual"

// Las 6 dimensiones de scoring (mapean 1:1 con perfiles)
export type Dimension =
  | "creatividad"    // → Explorador Creativo
  | "logica"         // → Pensador Lógico
  | "social"         // → Comunicador Social
  | "analitico"      // → Observador Analítico
  | "practico"       // → Constructor Práctico
  | "visual"         // → Aprendiz Visual

// Los 4 rangos etarios
export type AgeRange = "3-4" | "5-6" | "7-8" | "9-10"

// Valor de respuesta en escala 1-4
export type AnswerValue = 1 | 2 | 3 | 4

// ─── QUESTION STRUCTURE ─────────────────────────────────────

export interface DimensionWeight {
  dimension: Dimension
  multiplier: number  // 0.5 | 1.0 | 1.5 | 2.0
}

export type QuestionType =
  | "scale"    // Escala 1-4 (texto)
  | "visual_2" // El niño elige entre 2 imágenes SVG
  | "visual_4" // El niño elige entre 4 imágenes SVG

export type Respondent = "parent" | "child" | "both"

export type BlockId =
  | "como_juega"
  | "como_explora"
  | "como_se_relaciona"
  | "como_reacciona"
  | "como_piensa"
  | "como_aprende"
  | "que_le_gusta"
  | "como_resuelve"

export interface QuestionBlock {
  id: BlockId
  label: string
  ageRange: AgeRange
}

export interface VisualOption {
  value: AnswerValue
  svgKey: string
  label: string
  dimensionHint: Dimension
}

export interface Question {
  id: string
  ageRange: AgeRange
  blockId: BlockId
  type: QuestionType
  respondent: Respondent
  text: string
  subtext?: string
  weights: DimensionWeight[]
  visualOptions?: VisualOption[]
  scaleLabels?: [string, string, string, string]
}

// ─── LEARNING PROFILES ──────────────────────────────────────

export interface LearningProfile {
  id: ProfileId
  name: string
  tagline: string
  description: string
  dimension: Dimension
  strengths: string[]
  challenges: string[]
  idealContent: string[]
  infantiaAdaptation: string[]
  color: string
  colorLight: string
  colorDark: string
}

export const PROFILES: Record<ProfileId, LearningProfile> = {

  explorador_creativo: {
    id: "explorador_creativo",
    name: "Explorador Creativo",
    tagline: "Aprende experimentando, creando y probando",
    description:
      "Niño con alta curiosidad e imaginación que busca descubrir el mundo a su manera. " +
      "Se aburre con lo repetitivo y florece cuando tiene libertad para explorar.",
    dimension: "creatividad",
    strengths: [
      "Imaginación y creatividad muy desarrolladas",
      "Alta curiosidad ante lo desconocido",
      "Capacidad de generar ideas originales",
      "Disfruta los desafíos abiertos sin respuesta única",
    ],
    challenges: [
      "Puede aburrirse con actividades muy estructuradas o repetitivas",
      "Le cuesta seguir instrucciones paso a paso sin explorar",
      "Puede dispersarse si hay demasiadas opciones a la vez",
    ],
    idealContent: [
      "Desafíos abiertos con múltiples soluciones posibles",
      "Actividades de creación libre (dibujo, construcción, invención)",
      "Proyectos donde pueda tomar sus propias decisiones",
      "Exploración sin límites de tiempo estrictos",
    ],
    infantiaAdaptation: [
      "Modo sandbox con actividades de creación libre",
      "Desafíos sin respuesta única correcta",
      "Proyectos creativos que se construyen a lo largo del tiempo",
      "Recompensas por originalidad, no solo por precisión",
    ],
    color: "#FF6B35",
    colorLight: "#FFF0EB",
    colorDark: "#92320E",
  },

  pensador_logico: {
    id: "pensador_logico",
    name: "Pensador Lógico",
    tagline: "Aprende mediante lógica, patrones y orden",
    description:
      "Niño que busca entender cómo funcionan las cosas de forma estructurada. " +
      "Le gustan los problemas con solución clara y los entornos organizados.",
    dimension: "logica",
    strengths: [
      "Pensamiento secuencial y ordenado",
      "Alta tolerancia a la frustración cuando percibe progreso",
      "Disfruta puzzles, rompecabezas y problemas con solución",
      "Aprende mejor cuando comprende la estructura de lo que hace",
    ],
    challenges: [
      "Se bloquea si las reglas no son claras desde el inicio",
      "Poco interés por actividades abiertas sin objetivo definido",
      "Puede impacientarse con ritmos muy lentos o sin desafío",
    ],
    idealContent: [
      "Puzzles con niveles progresivos de dificultad",
      "Actividades de clasificación, ordenamiento y patrones",
      "Juegos de lógica con retroalimentación inmediata y precisa",
      "Mini-proyectos donde construye algo con una lógica clara",
    ],
    infantiaAdaptation: [
      "Modo desafío con niveles claramente definidos",
      "Retroalimentación precisa, no solo bien/mal",
      "Actividades de lógica, matemática y programación visual básica",
      "Sistema de logros basado en precisión y consistencia",
    ],
    color: "#0EA5E9",
    colorLight: "#F0F9FF",
    colorDark: "#0C527A",
  },

  comunicador_social: {
    id: "comunicador_social",
    name: "Comunicador Social",
    tagline: "Aprende hablando, compartiendo y participando",
    description:
      "Niño expresivo y sociable que aprende principalmente a través de la interacción " +
      "con otras personas. Aprende explicando o escuchando.",
    dimension: "social",
    strengths: [
      "Inteligencia emocional y social muy desarrollada",
      "Comunicación fluida y habilidades interpersonales tempranas",
      "Alta motivación cuando siente que pertenece a un grupo",
      "Aprende bien por comparación y conversación con pares",
    ],
    challenges: [
      "Actividades solitarias le resultan poco motivadoras",
      "Necesita sentir que su participación es vista y valorada",
      "Puede distraerse buscando interacción donde no la hay",
    ],
    idealContent: [
      "Actividades colaborativas y juegos en grupo",
      "Contenido que invite a compartir con un familiar",
      "Espacios para mostrar y explicar sus creaciones",
      "Retos que puedan hacerse con un hermano o adulto",
    ],
    infantiaAdaptation: [
      "Modo familiar: actividades padre-hijo integradas",
      "Tablero de logros visible para toda la familia",
      "Actividades de creación compartible (dibujos, historias)",
      "Comunidad de familias con logros y retos compartidos",
    ],
    color: "#F59E0B",
    colorLight: "#FFFBEB",
    colorDark: "#92400E",
  },

  observador_analitico: {
    id: "observador_analitico",
    name: "Observador Analítico",
    tagline: "Aprende observando, analizando y comprendiendo",
    description:
      "Niño tranquilo y detallista que procesa la información de forma reflexiva antes " +
      "de actuar. Piensa antes de responder y necesita tiempo para procesar.",
    dimension: "analitico",
    strengths: [
      "Capacidad de observación y atención al detalle muy alta",
      "Pensamiento reflexivo y profundo",
      "Muy buena retención cuando comprende antes de memorizar",
      "Constancia y calidad en lo que produce",
    ],
    challenges: [
      "Puede necesitar más tiempo que sus pares para arrancar",
      "Ambientes ruidosos o caóticos le dificultan el aprendizaje",
      "Puede bloquearse ante presión de tiempo o ritmo acelerado",
    ],
    idealContent: [
      "Actividades con tiempo suficiente para pensar antes de responder",
      "Explicaciones claras y completas antes de comenzar",
      "Entornos tranquilos con pocos estímulos simultáneos",
      "Contenido que permita revisar y corregir sin penalización",
    ],
    infantiaAdaptation: [
      "Sin límites de tiempo estrictos en actividades de comprensión",
      "Modo de revisión: posibilidad de volver y corregir",
      "Explicaciones detalladas antes de cada nueva actividad",
      "Progreso medido por profundidad, no solo por velocidad",
    ],
    color: "#7C3AED",
    colorLight: "#EDE9FF",
    colorDark: "#3B1A8C",
  },

  constructor_practico: {
    id: "constructor_practico",
    name: "Constructor Práctico",
    tagline: "Aprende haciendo, tocando y moviéndose",
    description:
      "Niño que aprende mejor a través de la acción y la experiencia física. " +
      "Le gusta construir, necesita moverse y aprende con el cuerpo.",
    dimension: "practico",
    strengths: [
      "Coordinación y habilidades motrices bien desarrolladas",
      "Aprende haciendo — la práctica supera a la teoría",
      "Alta motivación en actividades con resultado tangible",
      "Energía y persistencia cuando la actividad es física o manual",
    ],
    challenges: [
      "Puede impacientarse con actividades muy teóricas o abstractas",
      "Necesita moverse — le cuesta permanecer quieto mucho tiempo",
      "Las instrucciones largas sin acción le generan desconexión",
    ],
    idealContent: [
      "Actividades prácticas con resultado visible",
      "Juegos manuales y de construcción",
      "Desafíos físicos y cinéticos",
      "Experimentos donde puede tocar y manipular",
    ],
    infantiaAdaptation: [
      "Actividades con interacción táctil y movimiento en pantalla",
      "Proyectos de construcción digital paso a paso",
      "Desafíos con resultado visual e inmediato",
      "Mini-laboratorios y experimentos guiados",
    ],
    color: "#10B981",
    colorLight: "#ECFDF5",
    colorDark: "#065F46",
  },

  aprendiz_visual: {
    id: "aprendiz_visual",
    name: "Aprendiz Visual",
    tagline: "Aprende a través de imágenes, colores y representaciones visuales",
    description:
      "Niño que entiende mejor la información cuando la ve representada. " +
      "Recuerda mejor lo que ve, se enfoca en imágenes y le atraen colores, formas y gráficos.",
    dimension: "visual",
    strengths: [
      "Retiene información visual con mucha facilidad",
      "Detecta detalles, diferencias y patrones visuales",
      "Conecta conceptos abstractos con representaciones gráficas",
      "Alta atención ante estímulos visuales ricos",
    ],
    challenges: [
      "Puede perder atención en actividades sin estímulo visual",
      "Instrucciones puramente verbales le resultan difíciles de seguir",
      "Tendencia a dispersarse si hay demasiados elementos a la vez",
    ],
    idealContent: [
      "Contenido con ilustraciones ricas y detalladas",
      "Videos cortos y animaciones expresivas",
      "Mapas, esquemas y representaciones gráficas de conceptos",
      "Actividades de observación y memoria visual",
    ],
    infantiaAdaptation: [
      "Caminos de aprendizaje con alta carga visual",
      "Recompensas visuales inmediatas: animaciones, efectos, logros",
      "Minijuegos de observación y memoria visual",
      "Presentación de todos los conceptos mediante metáforas gráficas",
    ],
    color: "#EC4899",
    colorLight: "#FDF2F8",
    colorDark: "#831843",
  },
}

// ─── AGE WEIGHT MATRIX ──────────────────────────────────────

export type DimensionScores = Record<Dimension, number>  // 0–100

export type AgeWeightMatrix = Record<AgeRange, Record<Dimension, number>>

export const AGE_WEIGHT_MATRIX: AgeWeightMatrix = {
  "3-4": {
    creatividad: 1.5,
    logica:      0.5,
    social:      1.5,
    analitico:   0.5,
    practico:    1.5,
    visual:      1.0,
  },
  "5-6": {
    creatividad: 1.5,
    logica:      1.0,
    social:      1.5,
    analitico:   1.0,
    practico:    1.5,
    visual:      1.0,
  },
  "7-8": {
    creatividad: 1.0,
    logica:      1.5,
    social:      1.0,
    analitico:   1.5,
    practico:    1.0,
    visual:      1.0,
  },
  "9-10": {
    creatividad: 1.0,
    logica:      1.5,
    social:      1.0,
    analitico:   1.5,
    practico:    1.0,
    visual:      1.0,
  },
}

// ─── SCORING ENGINE ─────────────────────────────────────────

export interface ScoringInput {
  ageRange: AgeRange
  answers: Record<string, AnswerValue>
  questions: Question[]
}

export interface ProfileResult {
  primary: LearningProfile
  secondary: LearningProfile | null
  scores: DimensionScores
  confidence: "alta" | "media" | "baja"
  ageRange: AgeRange
}

export function calculateScores(input: ScoringInput): DimensionScores {
  const { ageRange, answers, questions } = input
  const ageWeights = AGE_WEIGHT_MATRIX[ageRange]

  const raw: DimensionScores = {
    creatividad: 0, logica: 0, social: 0,
    analitico: 0, practico: 0, visual: 0,
  }
  const maxRaw: DimensionScores = {
    creatividad: 0, logica: 0, social: 0,
    analitico: 0, practico: 0, visual: 0,
  }

  for (const question of questions) {
    const answer = answers[question.id]
    if (answer === undefined) continue

    for (const weight of question.weights) {
      const { dimension, multiplier } = weight
      const ageMultiplier = ageWeights[dimension]
      const finalMultiplier = multiplier * ageMultiplier

      const maxValue = question.type === "visual_2" ? 2 : 4

      raw[dimension]    += answer * finalMultiplier
      maxRaw[dimension] += maxValue * finalMultiplier
    }
  }

  const normalized = {} as DimensionScores
  const dims: Dimension[] = ["creatividad", "logica", "social", "analitico", "practico", "visual"]
  for (const dim of dims) {
    normalized[dim] = maxRaw[dim] > 0
      ? Math.round((raw[dim] / maxRaw[dim]) * 100)
      : 0
  }

  return normalized
}

const DIMENSION_TO_PROFILE: Record<Dimension, ProfileId> = {
  creatividad: "explorador_creativo",
  logica:      "pensador_logico",
  social:      "comunicador_social",
  analitico:   "observador_analitico",
  practico:    "constructor_practico",
  visual:      "aprendiz_visual",
}

const SECONDARY_THRESHOLD = 40

export function resolveProfiles(
  scores: DimensionScores,
  ageRange: AgeRange
): ProfileResult {
  const sorted = (Object.entries(scores) as [Dimension, number][])
    .sort(([, a], [, b]) => b - a)

  const [topDim,    topScore]  = sorted[0]
  const [secondDim, secondScore] = sorted[1]

  const gap = topScore - secondScore
  const confidence: ProfileResult["confidence"] =
    gap >= 25 ? "alta" :
    gap >= 12 ? "media" :
    "baja"

  const hasSecondary = secondScore >= SECONDARY_THRESHOLD

  return {
    primary:    PROFILES[DIMENSION_TO_PROFILE[topDim]],
    secondary:  hasSecondary ? PROFILES[DIMENSION_TO_PROFILE[secondDim]] : null,
    scores,
    confidence,
    ageRange,
  }
}

export function runScoringEngine(input: ScoringInput): ProfileResult {
  const scores = calculateScores(input)
  return resolveProfiles(scores, input.ageRange)
}

// ─── HELPERS ────────────────────────────────────────────────

export function getAgeRange(age: number): AgeRange | null {
  if (age >= 3 && age <= 4)  return "3-4"
  if (age >= 5 && age <= 6)  return "5-6"
  if (age >= 7 && age <= 8)  return "7-8"
  if (age >= 9 && age <= 10) return "9-10"
  return null
}

// ─── PLACEHOLDER QUESTIONS ──────────────────────────────────
// Las preguntas reales se definen por rango etario.
// Cada rango tiene sus propias preguntas adaptadas a la edad.
// Por ahora se usan placeholders — reemplazar con contenido real.

const DEFAULT_SCALE_LABELS: [string, string, string, string] =
  ["Casi nunca", "A veces", "Seguido", "Casi siempre"]

function makePlaceholderQuestions(ageRange: AgeRange): Question[] {
  // 8 bloques × 2 preguntas c/u = 16 preguntas por rango
  const blocks: { id: BlockId; label: string; dims: [Dimension, Dimension] }[] = [
    { id: "como_juega",         label: "Cómo juega",         dims: ["creatividad", "practico"] },
    { id: "como_explora",       label: "Cómo explora",       dims: ["creatividad", "visual"] },
    { id: "como_se_relaciona",  label: "Cómo se relaciona",  dims: ["social", "comunicador_social" as unknown as Dimension] },
    { id: "como_reacciona",     label: "Cómo reacciona",     dims: ["analitico", "practico"] },
    { id: "como_piensa",        label: "Cómo piensa",        dims: ["logica", "analitico"] },
    { id: "como_aprende",       label: "Cómo aprende",       dims: ["visual", "logica"] },
    { id: "que_le_gusta",       label: "Qué le gusta",       dims: ["creatividad", "social"] },
    { id: "como_resuelve",      label: "Cómo resuelve",      dims: ["logica", "practico"] },
  ]

  // Fix the social duplicate above
  blocks[2].dims = ["social", "creatividad"]

  const prefix = ageRange === "3-4" ? "a" : ageRange === "5-6" ? "b" : ageRange === "7-8" ? "c" : "d"
  const questions: Question[] = []
  let idx = 1

  for (const block of blocks) {
    // Question 1: primary dimension for this block
    questions.push({
      id: `${prefix}_${String(idx).padStart(2, "0")}`,
      ageRange,
      blockId: block.id,
      type: "scale",
      respondent: "parent",
      text: `[PLACEHOLDER — ${block.label}, pregunta 1 para rango ${ageRange}]`,
      weights: [{ dimension: block.dims[0], multiplier: 1.5 }],
      scaleLabels: DEFAULT_SCALE_LABELS,
    })
    idx++

    // Question 2: secondary dimension for this block
    questions.push({
      id: `${prefix}_${String(idx).padStart(2, "0")}`,
      ageRange,
      blockId: block.id,
      type: "scale",
      respondent: "parent",
      text: `[PLACEHOLDER — ${block.label}, pregunta 2 para rango ${ageRange}]`,
      weights: [{ dimension: block.dims[1], multiplier: 1.0 }],
      scaleLabels: DEFAULT_SCALE_LABELS,
    })
    idx++
  }

  return questions
}

// Questions indexed by age range
export const QUESTIONS_BY_AGE_RANGE: Record<AgeRange, Question[]> = {
  "3-4":  makePlaceholderQuestions("3-4"),
  "5-6":  makePlaceholderQuestions("5-6"),
  "7-8":  makePlaceholderQuestions("7-8"),
  "9-10": makePlaceholderQuestions("9-10"),
}

// ─── FIRESTORE SHAPES (client-safe) ────────────────────────

export type PlanId = "free" | "standard" | "premium" | "family"

export interface FirestoreChild {
  userId: string
  name: string
  age: number
  ageRange: AgeRange
  createdAt: unknown  // serverTimestamp() at write time
}

export interface FirestoreProfile {
  userId: string
  childId: string
  ageRange: AgeRange
  answers: Record<string, AnswerValue>
  scores: DimensionScores
  primaryProfileId: ProfileId
  secondaryProfileId: ProfileId | null
  confidence: "alta" | "media" | "baja"
  createdAt: unknown  // serverTimestamp() at write time
  scoringVersion: string
}
