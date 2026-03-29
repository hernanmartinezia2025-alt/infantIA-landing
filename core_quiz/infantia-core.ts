// ============================================================
// INFANTIA — ARQUITECTURA CORE
// Versión: 1.0
// Stack: TypeScript · Firebase · Next.js
// ============================================================
// PRINCIPIO DE DISEÑO:
// Las preguntas son DATOS. El motor no las conoce.
// Cambiar, agregar o eliminar preguntas no rompe nada.
// El motor solo consume pesos y respuestas.
// ============================================================


// ─────────────────────────────────────────────────────────────
// 1. TIPOS BASE
// ─────────────────────────────────────────────────────────────

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
// 1 = Casi nunca | 2 = A veces | 3 = Seguido | 4 = Casi siempre
// Para preguntas visuales: 1-2 (opción A o B) o 1-4 (opción A/B/C/D)
export type AnswerValue = 1 | 2 | 3 | 4


// ─────────────────────────────────────────────────────────────
// 2. ESTRUCTURA DE PREGUNTAS
// ─────────────────────────────────────────────────────────────

// Peso de una dimensión dentro de una pregunta
export interface DimensionWeight {
  dimension: Dimension
  multiplier: number  // 0.5 | 1.0 | 1.5 | 2.0
}

// Tipos de pregunta
export type QuestionType =
  | "scale"    // Escala 1-4 (texto)
  | "visual_2" // El niño elige entre 2 imágenes SVG
  | "visual_4" // El niño elige entre 4 imágenes SVG

// Quién responde esta pregunta
export type Respondent = "parent" | "child" | "both"

// Bloque temático que agrupa preguntas
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
  label: string          // Texto que ve el usuario: "Cómo juega"
  ageRange: AgeRange
}

// Estructura de una pregunta
// IMPORTANTE: las preguntas NO conocen al motor de scoring.
// Solo declaran sus pesos. El motor hace el resto.
export interface Question {
  id: string             // Único, inmutable. Ej: "a_01", "b_15"
  ageRange: AgeRange     // A qué test pertenece
  blockId: BlockId       // Bloque temático al que pertenece
  type: QuestionType     // Tipo de pregunta
  respondent: Respondent // Quién responde
  text: string           // Texto para el padre (o instrucción al niño)
  subtext?: string       // Aclaración opcional
  weights: DimensionWeight[] // Dimensiones que impacta y con qué fuerza

  // Solo para preguntas visuales
  visualOptions?: VisualOption[]

  // Solo para scale: etiquetas de las opciones
  scaleLabels?: [string, string, string, string]
}

// Opción dentro de una pregunta visual
export interface VisualOption {
  value: AnswerValue                 // 1, 2, 3 o 4
  svgKey: string                     // Clave del SVG en el registro de ilustraciones
  label: string                      // Texto accesible / tooltip
  dimensionHint: Dimension           // Qué perfil tiende a indicar esta opción
}


// ─────────────────────────────────────────────────────────────
// 3. PERFILES DE APRENDIZAJE
// ─────────────────────────────────────────────────────────────

export interface LearningProfile {
  id: ProfileId
  name: string
  tagline: string
  description: string
  dimension: Dimension         // Dimensión de scoring asociada
  strengths: string[]
  challenges: string[]
  idealContent: string[]
  infantiaAdaptation: string[]
  color: string                // Hex para UI
  colorLight: string           // Fondo claro
  colorDark: string            // Texto oscuro sobre fondo claro
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


// ─────────────────────────────────────────────────────────────
// 4. MATRIZ DE PESOS POR EDAD
// ─────────────────────────────────────────────────────────────
// Lógica: los perfiles cognitivos complejos (lógico, analítico)
// emergen más tarde. Darles menos peso en edades tempranas
// evita resultados poco creíbles.
// Visual es neutro en todos los rangos.

export type AgeWeightMatrix = Record<AgeRange, Record<Dimension, number>>

export const AGE_WEIGHT_MATRIX: AgeWeightMatrix = {
  "3-4": {
    creatividad: 1.5,  // Alta — muy evidente a esta edad
    logica:      0.5,  // Baja — capacidad cognitiva aún en desarrollo
    social:      1.5,  // Alta — central a esta edad
    analitico:   0.5,  // Baja — reflexión meta-cognitiva aún no emerge
    practico:    1.5,  // Alta — aprende principalmente con el cuerpo
    visual:      1.0,  // Neutro
  },
  "5-6": {
    creatividad: 1.5,
    logica:      1.0,  // Empieza a emerger
    social:      1.5,
    analitico:   1.0,  // Empieza a emerger
    practico:    1.5,
    visual:      1.0,
  },
  "7-8": {
    creatividad: 1.0,
    logica:      1.5,  // Ya bien desarrollada
    social:      1.0,
    analitico:   1.5,  // Ya bien desarrollada
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


// ─────────────────────────────────────────────────────────────
// 5. MOTOR DE SCORING
// ─────────────────────────────────────────────────────────────
// El motor NO conoce las preguntas.
// Solo recibe respuestas y pesos, y devuelve scores normalizados.

export type DimensionScores = Record<Dimension, number>  // 0–100

export interface ScoringInput {
  ageRange: AgeRange
  answers: Record<string, AnswerValue>   // { "a_01": 3, "a_02": 1, ... }
  questions: Question[]                  // Solo las preguntas del rango etario
}

export interface ProfileResult {
  primary: LearningProfile
  secondary: LearningProfile | null      // null si no hay secundario claro
  scores: DimensionScores                // Scores normalizados 0-100
  confidence: "alta" | "media" | "baja"
  ageRange: AgeRange
}

export function calculateScores(input: ScoringInput): DimensionScores {
  const { ageRange, answers, questions } = input
  const ageWeights = AGE_WEIGHT_MATRIX[ageRange]

  // Acumuladores
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

      // Para preguntas visuales de 2 opciones, el valor máximo es 2 (no 4)
      // Para preguntas visuales de 4 opciones y scale, el valor máximo es 4
      const maxValue = question.type === "visual_2" ? 2 : 4

      raw[dimension]    += answer * finalMultiplier
      maxRaw[dimension] += maxValue * finalMultiplier
    }
  }

  // Normalizar a 0–100
  const normalized = {} as DimensionScores
  const dims: Dimension[] = ["creatividad","logica","social","analitico","practico","visual"]
  for (const dim of dims) {
    normalized[dim] = maxRaw[dim] > 0
      ? Math.round((raw[dim] / maxRaw[dim]) * 100)
      : 0
  }

  return normalized
}

// Mapa dimension → profileId (interno, no exportar al cliente)
const DIMENSION_TO_PROFILE: Record<Dimension, ProfileId> = {
  creatividad: "explorador_creativo",
  logica:      "pensador_logico",
  social:      "comunicador_social",
  analitico:   "observador_analitico",
  practico:    "constructor_practico",
  visual:      "aprendiz_visual",
}

const SECONDARY_THRESHOLD = 40  // Score mínimo para tener perfil secundario

export function resolveProfiles(
  scores: DimensionScores,
  ageRange: AgeRange
): ProfileResult {
  // Ordenar dimensiones por score descendente
  const sorted = (Object.entries(scores) as [Dimension, number][])
    .sort(([, a], [, b]) => b - a)

  const [topDim,    topScore]  = sorted[0]
  const [secondDim, secondScore] = sorted[1]

  // Confianza: qué tan separado está el primero del segundo
  const gap = topScore - secondScore
  const confidence: ProfileResult["confidence"] =
    gap >= 25 ? "alta" :
    gap >= 12 ? "media" :
    "baja"

  // Secundario solo si supera el umbral
  const hasSecondary = secondScore >= SECONDARY_THRESHOLD

  return {
    primary:    PROFILES[DIMENSION_TO_PROFILE[topDim]],
    secondary:  hasSecondary ? PROFILES[DIMENSION_TO_PROFILE[secondDim]] : null,
    scores,
    confidence,
    ageRange,
  }
}

// Función principal — punto de entrada del motor
export function runScoringEngine(input: ScoringInput): ProfileResult {
  const scores = calculateScores(input)
  return resolveProfiles(scores, input.ageRange)
}


// ─────────────────────────────────────────────────────────────
// 6. ESTRUCTURA DE SESIÓN DE TEST
// ─────────────────────────────────────────────────────────────

export interface TestSession {
  sessionId: string               // UUID generado en cliente
  ageRange: AgeRange
  childName: string
  childAge: number
  parentEmail: string
  answers: Record<string, AnswerValue>
  currentQuestionIndex: number
  startedAt: string               // ISO date
  completedAt?: string            // ISO date
  gdprConsent: boolean
  gdprConsentAt: string
  plan: PlanId                    // Plan seleccionado (default: "free")
}

export type PlanId = "free" | "standard" | "premium" | "family"


// ─────────────────────────────────────────────────────────────
// 7. ESTRUCTURA DEL INFORME
// ─────────────────────────────────────────────────────────────

// Tipos de informe
export type ReportType = "preview" | "full"

// Datos base del informe (compartidos entre preview y full)
export interface ReportBase {
  reportId: string
  sessionId: string
  type: ReportType
  childName: string
  childAge: number
  ageRange: AgeRange
  parentEmail: string
  generatedAt: string              // ISO date
  result: ProfileResult
  plan: PlanId
}

// Preview: se muestra en pantalla inmediatamente
export interface PreviewReport extends ReportBase {
  type: "preview"
  sections: {
    headline: string               // "El perfil de Sofía"
    profileName: string            // "Explorador Creativo"
    tagline: string
    summary: string                // 2–3 oraciones
    strengths: string[]            // Top 3–4
    challenges: string[]           // Top 2
    scores: DimensionScores
    confidence: "alta" | "media" | "baja"
    ctaText: string                // Texto del CTA hacia lista de espera
  }
  disclaimer: string
}

// Full report: se envía por email 24hs después
export interface FullReport extends ReportBase {
  type: "full"
  sections: {
    intro: AgeAdaptedText          // Saludo + contexto
    profileMain: AgeAdaptedText    // Descripción del perfil dominante
    profileSecondary?: AgeAdaptedText  // Solo si hay secundario
    strengths: AgeAdaptedText      // Fortalezas con ejemplos concretos
    challenges: AgeAdaptedText     // Áreas a acompañar
    recommendations: AgeAdaptedText // Recomendaciones prácticas para padres
    infantiaSection: AgeAdaptedText // Cómo InfantIA se adapta a este perfil
    cta: AgeAdaptedText            // CTA final hacia la plataforma
  }
  attachments: ReportAttachment[]  // Boletín según plan y edad
  scores: DimensionScores
  disclaimer: string
}

// Texto adaptado por rango etario
// Cada campo tiene una versión por cada uno de los 4 rangos
export interface AgeAdaptedText {
  "3-4": string
  "5-6": string
  "7-8": string
  "9-10": string
}

export interface ReportAttachment {
  type: "boletin_actividades"
  ageRange: AgeRange
  fileName: string
  url?: string                     // URL del PDF en Firebase Storage
}


// ─────────────────────────────────────────────────────────────
// 8. MODELO FIRESTORE
// ─────────────────────────────────────────────────────────────
// Colecciones:
//   /sessions/{sessionId}      → estado de sesión del test
//   /results/{sessionId}       → resultado del scoring
//   /waitlist/{email}          → lista de espera

export interface FirestoreSession {
  sessionId: string
  childName: string
  childAge: number
  ageRange: AgeRange
  parentEmail: string
  answers: Record<string, AnswerValue>
  startedAt: string
  completedAt?: string
  gdprConsent: boolean
  gdprConsentAt: string
  plan: PlanId
  source: "landing_test"
}

export interface FirestoreResult {
  sessionId: string
  childName: string
  childAge: number
  ageRange: AgeRange
  parentEmail: string
  plan: PlanId

  // Scoring
  scores: DimensionScores
  primaryProfileId: ProfileId
  secondaryProfileId: ProfileId | null
  confidence: "alta" | "media" | "baja"

  // Estado del informe
  previewGeneratedAt: string
  fullReportScheduledFor: string   // startedAt + 24hs
  fullReportSentAt?: string
  fullReportEmailStatus: "pending" | "sent" | "failed"

  // Boletín
  boletinIncluded: boolean         // true si plan >= standard
  boletinSentAt?: string

  createdAt: string
}

export interface FirestoreWaitlistEntry {
  email: string
  childName: string
  childAge: number
  ageRange: AgeRange
  primaryProfileId: ProfileId
  plan: PlanId
  joinedAt: string
  source: "test_completion" | "landing_direct"
}


// ─────────────────────────────────────────────────────────────
// 9. ARQUITECTURA FIREBASE FUNCTIONS
// ─────────────────────────────────────────────────────────────

/*

FUNCIÓN 1: onTestCompleted
Trigger: onDocumentCreated("results/{sessionId}")
Responsabilidad:
  1. Leer el resultado del scoring
  2. Generar el contenido del preview report (en memoria)
  3. Escribir /results/{sessionId}/previewReport
  4. Agregar a /waitlist/{email} si no existe
  5. Programar el envío del full report para +24hs
     (usando Cloud Tasks o un campo scheduledFor + Cloud Scheduler)

FUNCIÓN 2: sendFullReport
Trigger: Cloud Scheduler cada hora / Cloud Tasks
Responsabilidad:
  1. Buscar resultados donde:
     fullReportScheduledFor <= now
     fullReportEmailStatus == "pending"
  2. Para cada uno:
     a. Generar el HTML del full report (template por ageRange y profileId)
     b. Adjuntar el boletín PDF si plan >= standard
     c. Enviar por email via Resend
     d. Actualizar fullReportEmailStatus = "sent"
     e. Registrar fullReportSentAt

FUNCIÓN 3: getPreviewReport (HTTP callable)
Trigger: llamada desde el cliente al terminar el test
Responsabilidad:
  1. Ejecutar runScoringEngine() con las respuestas
  2. Guardar en Firestore
  3. Retornar el preview report al cliente para mostrar en pantalla

*/


// ─────────────────────────────────────────────────────────────
// 10. REGISTRO DE SVGs (ilustraciones del test)
// ─────────────────────────────────────────────────────────────
// Las ilustraciones son SVG inline generados por código.
// Este registro conecta cada svgKey con su función generadora.
// Agregar una nueva ilustración = agregar una entrada aquí.
// No rompe ninguna pregunta existente.

export type SvgKey = string  // Ej: "child_building_blocks", "child_reading_book"

export interface SvgIllustration {
  key: SvgKey
  label: string            // Descripción accesible
  dimensionHint: Dimension // Qué perfil tiende a indicar
  ageRanges: AgeRange[]    // En qué tests puede aparecer
  // El SVG en sí se genera en el componente React/HTML
  // No se almacena aquí para mantener separación de concerns
}

// Registro de todas las ilustraciones del sistema
// Se irá completando cuando se diseñen las preguntas visuales
export const SVG_REGISTRY: Record<SvgKey, SvgIllustration> = {
  // Placeholder — se completa al diseñar las preguntas
  "child_building_blocks": {
    key: "child_building_blocks",
    label: "Niño construyendo una torre con bloques",
    dimensionHint: "practico",
    ageRanges: ["3-4", "5-6"],
  },
  "child_reading_book": {
    key: "child_reading_book",
    label: "Niño leyendo un libro de imágenes",
    dimensionHint: "visual",
    ageRanges: ["3-4", "5-6"],
  },
  "child_asking_question": {
    key: "child_asking_question",
    label: "Niño haciendo una pregunta a un adulto",
    dimensionHint: "social",
    ageRanges: ["3-4", "5-6"],
  },
  "child_playing_alone": {
    key: "child_playing_alone",
    label: "Niño jugando solo concentrado",
    dimensionHint: "analitico",
    ageRanges: ["3-4", "5-6"],
  },
}


// ─────────────────────────────────────────────────────────────
// 11. HELPER: DETERMINAR RANGO ETARIO DESDE EDAD
// ─────────────────────────────────────────────────────────────

export function getAgeRange(age: number): AgeRange | null {
  if (age >= 3 && age <= 4)  return "3-4"
  if (age >= 5 && age <= 6)  return "5-6"
  if (age >= 7 && age <= 8)  return "7-8"
  if (age >= 9 && age <= 10) return "9-10"
  return null  // Edad fuera de rango — manejar en UI
}


// ─────────────────────────────────────────────────────────────
// 12. HELPER: VALIDAR SESIÓN COMPLETA
// ─────────────────────────────────────────────────────────────

export function isSessionComplete(
  session: TestSession,
  questions: Question[]
): boolean {
  const answered = Object.keys(session.answers).length
  return answered === questions.length
}


// ─────────────────────────────────────────────────────────────
// 13. EJEMPLO DE USO COMPLETO
// ─────────────────────────────────────────────────────────────

/*

// 1. El padre ingresa el nombre y edad del niño
const age = 5
const ageRange = getAgeRange(age)  // "5-6"

// 2. Se carga el test correspondiente (preguntas del rango)
const questions = QUESTIONS_BY_AGE_RANGE["5-6"]  // (definidas en infantia-questions.ts)

// 3. El padre (y el niño en las visuales) responde
const answers: Record<string, AnswerValue> = {
  "b_01": 4,
  "b_02": 2,
  "b_03": 3,
  // ... etc
}

// 4. Se corre el motor
const result = runScoringEngine({ ageRange, answers, questions })

// result.primary    → PROFILES["explorador_creativo"]
// result.secondary  → PROFILES["comunicador_social"] (o null)
// result.scores     → { creatividad: 82, logica: 40, social: 71, ... }
// result.confidence → "alta"

// 5. Se guarda en Firestore y se muestra el preview
// 6. 24hs después se envía el full report por email

*/
