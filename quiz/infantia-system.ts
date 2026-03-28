// ============================================================
// INFANTIA — SISTEMA COMPLETO DE PERFIL DE APRENDIZAJE
// TypeScript · MVP · Firebase-ready
// ============================================================

// ─────────────────────────────────────────────────────────────
// SECCIÓN A: ESTRATEGIA DEL TEST
// ─────────────────────────────────────────────────────────────
//
// PROPÓSITO DE NEGOCIO
//   · Captura de leads calificados (email + datos del hijo)
//   · Lead magnet de alto valor percibido
//   · Primer momento de confianza con la marca
//   · Segmentación temprana de usuarios para personalizar onboarding
//
// PROPÓSITO DE PRODUCTO
//   · Genera el primer perfil del niño antes de que el padre
//     ingrese a la plataforma
//   · Sienta las bases del motor de personalización futuro
//   · Crea un artefacto (el informe) que el padre querrá guardar
//     y compartir → viralidad orgánica
//
// QUÉ DEBE SENTIR EL PADRE AL COMPLETARLO
//   · "Esto es diferente a lo que esperaba"
//   · "Me está preguntando cosas que realmente importan"
//   · "Tiene sentido, conozco a mi hijo así"
//   · Al terminar: "Quiero ver más de esto"


// ─────────────────────────────────────────────────────────────
// SECCIÓN B+C: TIPOS Y PERFILES
// ─────────────────────────────────────────────────────────────

export type Dimension =
  | "visual"        // Aprendizaje a través de imágenes, colores, espacios
  | "narrativo"     // Aprendizaje a través de historias, contexto, personajes
  | "exploratorio"  // Aprendizaje a través de prueba, error, descubrimiento
  | "guiado"        // Aprendizaje con estructura, instrucciones, acompañamiento
  | "social"        // Aprendizaje a través del juego compartido, interacción
  | "ritmico"       // Aprendizaje a través de repetición, ritmo, patrones

export type ProfileId =
  | "explorador_visual"
  | "narrador_curioso"
  | "pensador_logico"
  | "aprendiz_guiado"
  | "conector_social"
  | "maestro_del_ritmo"

export interface LearningProfile {
  id: ProfileId
  name: string
  tagline: string
  description: string
  dominantDimensions: Dimension[]
  strengths: string[]
  challenges: string[]
  idealContent: string[]
  infantiaAdaptation: string[]
  color: string
  icon: string
}

export const PROFILES: Record<ProfileId, LearningProfile> = {

  explorador_visual: {
    id: "explorador_visual",
    name: "Explorador Visual",
    tagline: "Aprende descubriendo con los ojos",
    description:
      "Tu hijo construye su comprensión del mundo a través de lo que ve. " +
      "Las imágenes, los colores, los espacios y los detalles visuales son " +
      "su lenguaje natural. Aprende mejor cuando puede 'ver para entender'.",
    dominantDimensions: ["visual", "exploratorio"],
    strengths: [
      "Retiene información visual con facilidad",
      "Detecta detalles que otros pasan por alto",
      "Conecta conceptos abstractos con representaciones visuales",
      "Alta curiosidad ante lo nuevo y lo diferente",
    ],
    challenges: [
      "Puede perder atención en actividades sin estímulo visual",
      "Instrucciones puramente verbales pueden resultarle difíciles",
      "Tendencia a dispersarse si hay demasiados estímulos a la vez",
    ],
    idealContent: [
      "Actividades con ilustraciones ricas y detalladas",
      "Videos cortos y animaciones expresivas",
      "Mapas, esquemas y representaciones visuales de conceptos",
      "Exploración libre con posibilidad de descubrir a su ritmo",
    ],
    infantiaAdaptation: [
      "Caminos de aprendizaje con alta carga visual",
      "Recompensas visuales inmediatas (animaciones, destellos, logros)",
      "Minijuegos de observación y memoria visual",
      "Presentación de conceptos mediante metáforas gráficas",
    ],
    color: "#FF6B35",
    icon: "👁️",
  },

  narrador_curioso: {
    id: "narrador_curioso",
    name: "Narrador Curioso",
    tagline: "Aprende cuando hay una historia que seguir",
    description:
      "Tu hijo necesita contexto para aprender. Los personajes, las tramas " +
      "y las situaciones le dan sentido a lo que estudia. Un concepto nuevo " +
      "le entra mucho mejor si viene envuelto en un relato.",
    dominantDimensions: ["narrativo", "social"],
    strengths: [
      "Memoria narrativa muy desarrollada",
      "Empatía alta, aprende bien por identificación con personajes",
      "Vocabulario rico y facilidad para expresarse",
      "Capacidad de imaginar y crear secuencias lógicas",
    ],
    challenges: [
      "Puede aburrirse con ejercicios sin contexto o significado",
      "Necesita entender el 'para qué' antes de hacer",
      "Puede desconcentrarse si la historia no le engancha",
    ],
    idealContent: [
      "Cuentos interactivos donde las decisiones importan",
      "Personajes que evolucionan con el progreso del niño",
      "Contexto narrativo para cada habilidad o concepto nuevo",
      "Actividades que simulan situaciones cotidianas",
    ],
    infantiaAdaptation: [
      "Universo narrativo propio de InfantIA con personajes recurrentes",
      "Cada módulo presentado como un capítulo de una historia",
      "Progreso del niño reflejado en la evolución del mundo del juego",
      "Actividades de escritura y narración creativa",
    ],
    color: "#7C3AED",
    icon: "📖",
  },

  pensador_logico: {
    id: "pensador_logico",
    name: "Pensador Lógico",
    tagline: "Aprende cuando puede resolver y entender el porqué",
    description:
      "Tu hijo disfruta los desafíos que tienen solución. Necesita entender " +
      "las reglas antes de jugar. La consistencia, la lógica y los patrones " +
      "son su terreno natural.",
    dominantDimensions: ["exploratorio", "ritmico"],
    strengths: [
      "Alta tolerancia a la frustración si percibe avance",
      "Pensamiento secuencial y ordenado",
      "Disfruta los puzzles, los rompecabezas y los problemas con solución",
      "Aprende mejor cuando comprende la estructura de lo que hace",
    ],
    challenges: [
      "Puede bloquarse si las reglas no son claras",
      "Poco interés por actividades abiertas sin objetivo definido",
      "Puede impacientarse con actividades muy narrativas o lentas",
    ],
    idealContent: [
      "Puzzles con niveles progresivos de dificultad",
      "Actividades de clasificación, ordenamiento y patrones",
      "Desafíos con retroalimentación inmediata y precisa",
      "Mini-proyectos donde construye algo con lógica",
    ],
    infantiaAdaptation: [
      "Modo desafío con niveles claramente definidos",
      "Retroalimentación precisa, no solo 'bien/mal'",
      "Actividades de programación visual básica, lógica y matemática",
      "Sistema de logros basado en precisión y consistencia",
    ],
    color: "#0EA5E9",
    icon: "🧩",
  },

  aprendiz_guiado: {
    id: "aprendiz_guiado",
    name: "Aprendiz Guiado",
    tagline: "Aprende mejor con apoyo y estructura clara",
    description:
      "Tu hijo florece cuando tiene un adulto o un guía que lo acompaña. " +
      "La estructura, las instrucciones claras y el reconocimiento de su " +
      "esfuerzo son lo que más lo impulsa a aprender.",
    dominantDimensions: ["guiado", "social"],
    strengths: [
      "Muy receptivo a instrucciones claras",
      "Alta motivación cuando recibe reconocimiento",
      "Aprende bien por imitación y modelado",
      "Constante y dedicado cuando siente que lo acompañan",
    ],
    challenges: [
      "Puede insegurrizarse ante actividades completamente abiertas",
      "Necesita más tiempo de arranque si no tiene guía inicial",
      "La frustración puede aparecer rápido si se siente solo en la tarea",
    ],
    idealContent: [
      "Tutoriales paso a paso con voz o avatar guía",
      "Actividades con instrucciones visuales claras antes de empezar",
      "Feedback frecuente y positivo durante el proceso",
      "Progreso incremental con celebraciones en cada avance",
    ],
    infantiaAdaptation: [
      "Personaje guía presente en cada nueva actividad",
      "Modo 'acompañado' con ayudas disponibles siempre",
      "Sistema de micro-recompensas por cada pequeño logro",
      "Notificaciones para padres con avances detallados",
    ],
    color: "#10B981",
    icon: "🌱",
  },

  conector_social: {
    id: "conector_social",
    name: "Conector Social",
    tagline: "Aprende cuando puede compartir y jugar con otros",
    description:
      "Tu hijo aprende más y mejor cuando hay interacción humana. El " +
      "juego compartido, la conversación y el sentido de comunidad son " +
      "los motores de su aprendizaje.",
    dominantDimensions: ["social", "narrativo"],
    strengths: [
      "Inteligencia emocional y social muy desarrollada",
      "Aprende bien por comparación y discusión con pares",
      "Alta motivación cuando siente que pertenece a un grupo",
      "Comunicación fluida y habilidades interpersonales tempranas",
    ],
    challenges: [
      "Actividades solitarias pueden resultarle poco motivadoras",
      "Puede distraerse buscando interacción donde no la hay",
      "Necesita sentir que su participación es vista y valorada",
    ],
    idealContent: [
      "Actividades colaborativas y juegos en grupo",
      "Contenido que invite a compartir con un familiar",
      "Retos que puedan hacerse con un hermano o un adulto",
      "Espacios para mostrar sus creaciones",
    ],
    infantiaAdaptation: [
      "Modo familiar: actividades padre-hijo integradas",
      "Tablero de logros visible para la familia",
      "Actividades de creación compartible (dibujos, historias)",
      "Comunidad de familias con logros y retos compartidos",
    ],
    color: "#F59E0B",
    icon: "🤝",
  },

  maestro_del_ritmo: {
    id: "maestro_del_ritmo",
    name: "Maestro del Ritmo",
    tagline: "Aprende a través de la repetición, el movimiento y los patrones",
    description:
      "Tu hijo tiene una relación especial con el ritmo: la repetición no " +
      "lo aburre, le da seguridad. El movimiento, la música y los patrones " +
      "regulares son su forma preferida de fijar lo que aprende.",
    dominantDimensions: ["ritmico", "visual"],
    strengths: [
      "Aprende con rapidez cuando hay repetición estructurada",
      "Muy buena memoria procedimental (hacer cosas paso a paso)",
      "Disfruta y aprende con música, rimas y juegos de movimiento",
      "Alta concentración en actividades rítmicas y predecibles",
    ],
    challenges: [
      "Puede resistir los cambios abruptos de actividad",
      "Las transiciones sin aviso previo pueden generarle ansiedad",
      "Menos flexible ante actividades muy abiertas o impredecibles",
    ],
    idealContent: [
      "Canciones, rimas y actividades con música",
      "Rutinas de aprendizaje con estructura predecible",
      "Patrones visuales, series matemáticas y secuencias",
      "Actividades cortas y repetibles con variaciones graduales",
    ],
    infantiaAdaptation: [
      "Rutina diaria de aprendizaje con estructura consistente",
      "Canciones educativas integradas a los módulos",
      "Sistema de hábitos con recordatorios y celebraciones de racha",
      "Actividades de ritmo, música y movimiento como herramienta pedagógica",
    ],
    color: "#EC4899",
    icon: "🎵",
  },
}


// ─────────────────────────────────────────────────────────────
// SECCIÓN D: DIMENSIONES Y SCORING
// ─────────────────────────────────────────────────────────────

export interface DimensionScores {
  visual: number
  narrativo: number
  exploratorio: number
  guiado: number
  social: number
  ritmico: number
}

export type AnswerValue = 1 | 2 | 3 | 4  // nunca / a veces / seguido / siempre

export interface QuestionWeight {
  dimension: Dimension
  multiplier: number  // 1.0 = normal, 1.5 = alta carga, 0.5 = carga parcial
}

export interface Question {
  id: string
  text: string
  subtext?: string           // aclaración opcional para el padre
  weights: QuestionWeight[]  // una pregunta puede impactar 1-2 dimensiones
  answerLabels: [string, string, string, string]
}

// SISTEMA DE SCORING
// · Cada respuesta tiene valor 1-4
// · Se multiplica por el peso de la dimensión
// · Scores normalizados a 0-100 por dimensión
// · Perfil principal = dimensión con mayor score
// · Perfil secundario = segunda dimensión más alta
// · Solo se asigna secundario si score ≥ 40% del máximo posible

export function calculateScores(
  answers: Record<string, AnswerValue>,
  questions: Question[]
): DimensionScores {
  const raw: DimensionScores = {
    visual: 0, narrativo: 0, exploratorio: 0,
    guiado: 0, social: 0, ritmico: 0,
  }
  const maxRaw: DimensionScores = {
    visual: 0, narrativo: 0, exploratorio: 0,
    guiado: 0, social: 0, ritmico: 0,
  }

  for (const question of questions) {
    const answer = answers[question.id]
    if (answer === undefined) continue
    for (const w of question.weights) {
      raw[w.dimension] += answer * w.multiplier
      maxRaw[w.dimension] += 4 * w.multiplier  // máximo posible
    }
  }

  // Normalizar a 0-100
  const normalized = {} as DimensionScores
  for (const dim of Object.keys(raw) as Dimension[]) {
    normalized[dim] = maxRaw[dim] > 0
      ? Math.round((raw[dim] / maxRaw[dim]) * 100)
      : 0
  }
  return normalized
}

function dimensionToProfileId(dim: Dimension): ProfileId {
  const map: Record<Dimension, ProfileId> = {
    visual: "explorador_visual",
    narrativo: "narrador_curioso",
    exploratorio: "pensador_logico",
    guiado: "aprendiz_guiado",
    social: "conector_social",
    ritmico: "maestro_del_ritmo",
  }
  return map[dim]
}

export interface ProfileResult {
  primaryProfile: LearningProfile
  secondaryProfile: LearningProfile | null
  scores: DimensionScores
  confidence: "alta" | "media" | "baja"
}

export function resolveProfiles(scores: DimensionScores): ProfileResult {
  const sorted = (Object.entries(scores) as [Dimension, number][])
    .sort(([, a], [, b]) => b - a)

  const [topDim, topScore] = sorted[0]
  const [secondDim, secondScore] = sorted[1]

  const secondaryThreshold = 40  // mínimo para considerar perfil secundario
  const hasSecondary = secondScore >= secondaryThreshold

  // Confianza: diferencia entre top1 y top2
  const gap = topScore - secondScore
  const confidence: ProfileResult["confidence"] =
    gap >= 25 ? "alta" : gap >= 12 ? "media" : "baja"

  return {
    primaryProfile: PROFILES[dimensionToProfileId(topDim)],
    secondaryProfile: hasSecondary
      ? PROFILES[dimensionToProfileId(secondDim)]
      : null,
    scores,
    confidence,
  }
}


// ─────────────────────────────────────────────────────────────
// SECCIÓN E: PREGUNTAS DEL TEST (15 preguntas)
// ─────────────────────────────────────────────────────────────
// Formato de respuesta estándar para todas:
// 1 = Casi nunca | 2 = A veces | 3 = Seguido | 4 = Casi siempre

export const QUESTIONS: Question[] = [
  {
    id: "q01",
    text: "Cuando le explico algo nuevo, ¿busca verlo dibujado, señalado o en imágenes antes de entenderlo?",
    weights: [{ dimension: "visual", multiplier: 1.5 }],
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
  {
    id: "q02",
    text: "¿Le gustan los cuentos, historias o personajes, y recuerda bien lo que pasa en ellos?",
    weights: [
      { dimension: "narrativo", multiplier: 1.5 },
      { dimension: "social", multiplier: 0.5 },
    ],
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
  {
    id: "q03",
    text: "¿Tiende a explorar los juguetes o actividades por su cuenta, sin esperar que le expliquen cómo usarlos?",
    weights: [{ dimension: "exploratorio", multiplier: 1.5 }],
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
  {
    id: "q04",
    text: "Cuando empieza una actividad nueva, ¿busca que un adulto esté cerca o lo ayude a arrancar?",
    weights: [{ dimension: "guiado", multiplier: 1.5 }],
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
  {
    id: "q05",
    text: "¿Disfruta jugar con otros niños o con adultos más que solo?",
    weights: [
      { dimension: "social", multiplier: 1.5 },
      { dimension: "narrativo", multiplier: 0.5 },
    ],
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
  {
    id: "q06",
    text: "¿Le atraen las canciones, rimas o cualquier actividad con ritmo o música?",
    weights: [{ dimension: "ritmico", multiplier: 1.5 }],
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
  {
    id: "q07",
    text: "¿Nota y menciona detalles visuales (colores, formas, diferencias en dibujos) que otros pasan por alto?",
    weights: [{ dimension: "visual", multiplier: 1.0 }],
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
  {
    id: "q08",
    text: "Cuando le pedís que haga algo, ¿necesita entender el 'para qué' o el contexto antes de empezar?",
    weights: [{ dimension: "narrativo", multiplier: 1.0 }],
    subtext: "Por ejemplo: pregunta por qué hacemos esto, o quiere saber qué pasa después.",
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
  {
    id: "q09",
    text: "¿Persiste en resolver un problema o puzzle aunque le cueste, sin querer que le den la respuesta?",
    weights: [{ dimension: "exploratorio", multiplier: 1.0 }],
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
  {
    id: "q10",
    text: "¿Responde mejor a una tarea cuando le mostrás primero cómo se hace?",
    weights: [
      { dimension: "guiado", multiplier: 1.0 },
      { dimension: "visual", multiplier: 0.5 },
    ],
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
  {
    id: "q11",
    text: "¿Le gusta mostrarle a otros lo que hizo o aprendió?",
    weights: [{ dimension: "social", multiplier: 1.0 }],
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
  {
    id: "q12",
    text: "¿Aprende mejor cuando las actividades tienen una estructura fija, una rutina o se repiten de forma similar?",
    weights: [{ dimension: "ritmico", multiplier: 1.0 }],
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
  {
    id: "q13",
    text: "¿Se distrae o frustra cuando hay muchos cambios de actividad sin aviso previo?",
    weights: [
      { dimension: "ritmico", multiplier: 0.5 },
      { dimension: "guiado", multiplier: 0.5 },
    ],
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
  {
    id: "q14",
    text: "Cuando juega, ¿prefiere inventar situaciones y personajes propios (juego simbólico, dramatizaciones)?",
    weights: [
      { dimension: "narrativo", multiplier: 1.0 },
      { dimension: "exploratorio", multiplier: 0.5 },
    ],
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
  {
    id: "q15",
    text: "¿Reacciona bien ante los elogios y el reconocimiento durante una tarea, motivándose para seguir?",
    weights: [
      { dimension: "guiado", multiplier: 1.0 },
      { dimension: "social", multiplier: 0.5 },
    ],
    answerLabels: ["Casi nunca", "A veces", "Seguido", "Casi siempre"],
  },
]


// ─────────────────────────────────────────────────────────────
// SECCIÓN F+G: ESTRUCTURA DEL INFORME
// ─────────────────────────────────────────────────────────────

export interface ReportData {
  childName: string
  childAge: number             // en años
  parentEmail: string
  generatedAt: string          // ISO date string
  result: ProfileResult
  reportId: string
}

export function generateReportContent(report: ReportData): ReportContent {
  const { result, childName } = report
  const { primaryProfile, secondaryProfile, confidence } = result

  const disclaimerNote =
    "Este informe ofrece una orientación inicial sobre las preferencias de " +
    "aprendizaje observadas a partir de las respuestas del adulto responsable. " +
    "No constituye un diagnóstico ni una evaluación psicológica o pedagógica formal."

  return {
    title: `Perfil de aprendizaje de ${childName}`,
    subtitle: `${primaryProfile.name}${secondaryProfile ? ` · ${secondaryProfile.name}` : ""}`,
    primaryProfile,
    secondaryProfile,
    scores: result.scores,
    confidence,
    summary: buildSummary(childName, primaryProfile, secondaryProfile, confidence),
    strengths: primaryProfile.strengths,
    challenges: primaryProfile.challenges,
    recommendations: primaryProfile.infantiaAdaptation,
    ctaText:
      `Cuando InfantIA abra sus puertas, el recorrido de ${childName} ` +
      `estará pensado exactamente para su forma de aprender.`,
    disclaimer: disclaimerNote,
  }
}

interface ReportContent {
  title: string
  subtitle: string
  primaryProfile: LearningProfile
  secondaryProfile: LearningProfile | null
  scores: DimensionScores
  confidence: "alta" | "media" | "baja"
  summary: string
  strengths: string[]
  challenges: string[]
  recommendations: string[]
  ctaText: string
  disclaimer: string
}

function buildSummary(
  name: string,
  primary: LearningProfile,
  secondary: LearningProfile | null,
  confidence: ProfileResult["confidence"]
): string {
  const secondaryNote = secondary
    ? ` También muestra rasgos propios del perfil ${secondary.name}: ${secondary.tagline.toLowerCase()}.`
    : ""

  const confidenceNote =
    confidence === "alta"
      ? "El perfil resultante es claro y consistente con las respuestas."
      : confidence === "media"
      ? "El perfil tiene algunas características mixtas, lo cual es completamente normal en esta etapa."
      : "Las respuestas muestran un perfil mixto, lo que sugiere que este niño se adapta bien a distintos tipos de aprendizaje."

  return (
    `${name} ${primary.description} ${secondaryNote} ${confidenceNote}`
  )
}


// ─────────────────────────────────────────────────────────────
// SECCIÓN H+I: ARQUITECTURA FIREBASE + ENVÍO DE EMAIL
// ─────────────────────────────────────────────────────────────

// FLUJO COMPLETO:
//
//  [Landing Page]
//      │
//      ▼
//  [Test (15 preguntas)] → usuario responde
//      │
//      ▼
//  [Formulario de captura] → nombre del niño, edad, email del padre
//      │
//      ▼
//  [calculateScores() + resolveProfiles()] → se ejecuta en cliente
//      │
//      ▼
//  [Guardar en Firestore] → colección 'profiles'
//      │
//      ▼
//  [Firebase Function trigger: onDocumentCreated('profiles/{id}')]
//      │
//      ▼
//  [Generar HTML del informe] → template con datos del perfil
//      │
//      ▼
//  [Envío via Resend / Nodemailer + SendGrid]
//      │
//      ▼
//  [Mostrar informe en pantalla] (en paralelo al email)

// ─── MODELO FIRESTORE ───────────────────────────────────────

export interface FirestoreProfile {
  // Datos personales
  childName: string
  childAge: number
  parentEmail: string
  createdAt: FirebaseFirestore.Timestamp   // usar serverTimestamp()
  source: "landing_test"

  // Respuestas crudas
  answers: Record<string, AnswerValue>  // { "q01": 3, "q02": 1, ... }

  // Resultado calculado
  scores: DimensionScores
  primaryProfileId: ProfileId
  secondaryProfileId: ProfileId | null
  confidence: "alta" | "media" | "baja"

  // Estado del email
  emailSent: boolean
  emailSentAt?: FirebaseFirestore.Timestamp

  // Consentimiento
  gdprConsent: boolean
  gdprConsentAt: FirebaseFirestore.Timestamp
}

// ─── JSON SCHEMA SUGERIDO (para API/frontend) ───────────────

export const EXAMPLE_PAYLOAD = {
  childName: "Mateo",
  childAge: 5,
  parentEmail: "padre@ejemplo.com",
  answers: {
    q01: 4, q02: 3, q03: 2, q04: 1, q05: 3,
    q06: 2, q07: 4, q08: 3, q09: 2, q10: 1,
    q11: 3, q12: 2, q13: 1, q14: 3, q15: 2,
  },
  gdprConsent: true,
}

// ─── PSEUDOCÓDIGO FIREBASE FUNCTION ─────────────────────────

/*

exports.sendProfileReport = onDocumentCreated("profiles/{profileId}", async (event) => {
  const profile = event.data.data() as FirestoreProfile

  // 1. Obtener datos del perfil
  const primaryProfile = PROFILES[profile.primaryProfileId]
  const secondaryProfile = profile.secondaryProfileId
    ? PROFILES[profile.secondaryProfileId]
    : null

  // 2. Generar HTML del email
  const htmlContent = renderEmailTemplate({
    childName: profile.childName,
    childAge: profile.childAge,
    primaryProfile,
    secondaryProfile,
    scores: profile.scores,
    confidence: profile.confidence,
  })

  // 3. Enviar email via Resend (recomendado por simplicidad)
  await resend.emails.send({
    from: "InfantIA <hola@infantia.app>",
    to: profile.parentEmail,
    subject: `El perfil de aprendizaje de ${profile.childName} está listo`,
    html: htmlContent,
  })

  // 4. Actualizar documento
  await event.data.ref.update({
    emailSent: true,
    emailSentAt: FieldValue.serverTimestamp(),
  })
})

*/

// ─── RECOMENDACIÓN DE STACK MVP ──────────────────────────────
//
// Frontend:    Next.js 14 (App Router) + Tailwind CSS
// Base de datos: Firebase Firestore
// Auth:        Firebase Auth (solo para padres registrados post-test)
// Functions:   Firebase Cloud Functions (gen2, Node 20)
// Email:       Resend (más simple que SendGrid para MVP)
//              → SDK JavaScript, templates React Email
// Hosting:     Firebase Hosting o Vercel
//
// RESEND VS SENDGRID para MVP:
// · Resend: API key en minutos, React Email templates, límite free 3000/mes ✓
// · SendGrid: más potente pero más fricción para arrancar
// → Recomendación: Resend para MVP, migrar a SendGrid si escala
//
// SEGURIDAD DE DATOS:
// · Reglas Firestore: solo escritura desde cliente autenticado o anónimo
//   con rate limiting
// · Nunca exponer API keys de email en frontend
// · GDPR: checkbox explícito, timestamp guardado, política de privacidad
// · No guardar datos sensibles del niño más allá de nombre y edad
// · Opción de borrado en el email: "Eliminar mis datos"
