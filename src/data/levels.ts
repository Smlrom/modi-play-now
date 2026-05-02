// ── Question type ──
export interface GameQuestion {
  prompt: string;
  image?: string;
  hint?: string;
  correct: string;
  options: string[];
}

export interface LevelInfo {
  category: string;
  name: string;
}

// ── Level info helpers ──
const BASIC_LEVELS: LevelInfo[] = [
  { category: "Vocales", name: "Vocales 1" },
  { category: "Vocales", name: "Vocales 2" },
  { category: "Vocales", name: "Vocales 3" },
  { category: "Abecedario", name: "ABC 1" },
  { category: "Abecedario", name: "ABC 2" },
  { category: "Abecedario", name: "ABC 3" },
  { category: "Números", name: "Números 1" },
  { category: "Números", name: "Números 2" },
  { category: "Números", name: "Números 3" },
];

export function getLevelInfo(difficulty: string, level: number): LevelInfo {
  if (difficulty === "basic") return BASIC_LEVELS[level - 1] || { category: "Básico", name: `Nivel ${level}` };
  if (difficulty === "normal") return { category: "Palabras", name: `Palabras ${level}` };
  if (difficulty === "advanced") return { category: "Frases", name: `Frases ${level}` };
  return { category: "Difícil", name: `Difícil ${level}` };
}

// ── Shuffler ──
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

// ── Basic: Vowels (levels 1-3) ──
const VOWEL_QS: GameQuestion[] = [
  { prompt: "¿Cuál es esta vocal?", image: "🍎", correct: "A", options: ["A", "E", "O", "U"] },
  { prompt: "¿Con qué vocal empieza 'Elefante'?", image: "🐘", correct: "E", options: ["I", "E", "A", "O"] },
  { prompt: "¿Con qué vocal empieza 'Iguana'?", image: "🦎", correct: "I", options: ["U", "O", "I", "A"] },
  { prompt: "¿Con qué vocal empieza 'Oso'?", image: "🐻", correct: "O", options: ["E", "O", "U", "I"] },
  { prompt: "¿Con qué vocal empieza 'Uva'?", image: "🍇", correct: "U", options: ["A", "I", "O", "U"] },
  { prompt: "¿Qué vocal tiene 'Avión'?", image: "✈️", correct: "A", options: ["A", "E", "I", "U"] },
  { prompt: "¿Con qué vocal empieza 'Estrella'?", image: "⭐", correct: "E", options: ["E", "A", "O", "I"] },
  { prompt: "¿Con qué vocal empieza 'Isla'?", image: "🏝️", correct: "I", options: ["I", "U", "A", "O"] },
  { prompt: "¿Con qué vocal empieza 'Oreja'?", image: "👂", correct: "O", options: ["O", "E", "I", "A"] },
  { prompt: "¿Con qué vocal empieza 'Uno'?", image: "1️⃣", correct: "U", options: ["U", "O", "A", "E"] },
  { prompt: "¿Qué vocal suena en 'Sol'?", image: "☀️", correct: "O", options: ["A", "E", "O", "U"] },
  { prompt: "¿Con qué vocal empieza 'Araña'?", image: "🕷️", correct: "A", options: ["A", "I", "U", "E"] },
  { prompt: "¿Con qué vocal empieza 'Iglú'?", image: "🏠", correct: "I", options: ["I", "E", "O", "U"] },
  { prompt: "¿Con qué vocal empieza 'Unicornio'?", image: "🦄", correct: "U", options: ["U", "A", "O", "I"] },
  { prompt: "¿Con qué vocal empieza 'Escuela'?", image: "🏫", correct: "E", options: ["E", "A", "I", "O"] },
];

// ── Basic: Alphabet (levels 4-6) ──
const ALPHABET_QS: GameQuestion[] = [
  { prompt: "¿Con qué letra empieza 'Bola'?", image: "⚽", correct: "B", options: ["B", "D", "P", "M"] },
  { prompt: "¿Con qué letra empieza 'Casa'?", image: "🏠", correct: "C", options: ["C", "K", "S", "Z"] },
  { prompt: "¿Con qué letra empieza 'Dado'?", image: "🎲", correct: "D", options: ["D", "B", "T", "P"] },
  { prompt: "¿Con qué letra empieza 'Foca'?", image: "🦭", correct: "F", options: ["F", "V", "P", "T"] },
  { prompt: "¿Con qué letra empieza 'Gato'?", image: "🐱", correct: "G", options: ["G", "J", "C", "Q"] },
  { prompt: "¿Con qué letra empieza 'Helado'?", image: "🍦", correct: "H", options: ["H", "A", "J", "N"] },
  { prompt: "¿Con qué letra empieza 'Jirafa'?", image: "🦒", correct: "J", options: ["J", "G", "Y", "H"] },
  { prompt: "¿Con qué letra empieza 'Luna'?", image: "🌙", correct: "L", options: ["L", "N", "M", "R"] },
  { prompt: "¿Con qué letra empieza 'Mano'?", image: "✋", correct: "M", options: ["M", "N", "W", "L"] },
  { prompt: "¿Con qué letra empieza 'Nube'?", image: "☁️", correct: "N", options: ["N", "M", "Ñ", "L"] },
  { prompt: "¿Con qué letra empieza 'Pato'?", image: "🦆", correct: "P", options: ["P", "B", "D", "T"] },
  { prompt: "¿Con qué letra empieza 'Rana'?", image: "🐸", correct: "R", options: ["R", "L", "D", "N"] },
  { prompt: "¿Con qué letra empieza 'Sol'?", image: "☀️", correct: "S", options: ["S", "Z", "C", "X"] },
  { prompt: "¿Con qué letra empieza 'Taza'?", image: "☕", correct: "T", options: ["T", "D", "P", "L"] },
  { prompt: "¿Con qué letra empieza 'Vaca'?", image: "🐄", correct: "V", options: ["V", "B", "F", "W"] },
];

// ── Basic: Numbers (levels 7-9) ──
const NUMBER_QS: GameQuestion[] = [
  { prompt: "¿Qué número es este?", image: "1️⃣", correct: "1", options: ["1", "2", "3", "7"] },
  { prompt: "¿Qué número es este?", image: "2️⃣", correct: "2", options: ["2", "5", "3", "1"] },
  { prompt: "¿Qué número es este?", image: "3️⃣", correct: "3", options: ["3", "8", "5", "2"] },
  { prompt: "¿Qué número es este?", image: "4️⃣", correct: "4", options: ["4", "7", "1", "9"] },
  { prompt: "¿Qué número es este?", image: "5️⃣", correct: "5", options: ["5", "2", "8", "3"] },
  { prompt: "¿Qué número es este?", image: "6️⃣", correct: "6", options: ["6", "9", "8", "0"] },
  { prompt: "¿Qué número es este?", image: "7️⃣", correct: "7", options: ["7", "1", "4", "9"] },
  { prompt: "¿Qué número es este?", image: "8️⃣", correct: "8", options: ["8", "3", "6", "0"] },
  { prompt: "¿Qué número es este?", image: "9️⃣", correct: "9", options: ["9", "6", "4", "7"] },
  { prompt: "¿Cuántas manzanas hay? 🍎🍎🍎", correct: "3", options: ["2", "3", "4", "5"] },
  { prompt: "¿Cuántos dedos? ✋", correct: "5", options: ["4", "5", "6", "3"] },
  { prompt: "¿Qué número viene después del 3?", correct: "4", options: ["2", "4", "5", "6"] },
  { prompt: "¿Qué número viene antes del 7?", correct: "6", options: ["5", "6", "8", "4"] },
  { prompt: "¿Cuántas estrellas? ⭐⭐", correct: "2", options: ["1", "2", "3", "4"] },
  { prompt: "¿Qué número es el más grande?", correct: "9", options: ["3", "5", "7", "9"] },
];

// ── Normal: Word building ──
const WORD_QS: GameQuestion[] = [
  { prompt: "¿Cómo se escribe?", image: "👩", correct: "MAMÁ", options: ["MAMÁ", "PAPÁ", "MAPA", "MASA"] },
  { prompt: "¿Cómo se escribe?", image: "👨", correct: "PAPÁ", options: ["PAPÁ", "PATO", "PALA", "MAMÁ"] },
  { prompt: "¿Cómo se escribe?", image: "✈️", correct: "AVIÓN", options: ["AVIÓN", "ABEJA", "AUTO", "ARCO"] },
  { prompt: "¿Cómo se escribe?", image: "🐱", correct: "GATO", options: ["GATO", "PATO", "RATO", "DATO"] },
  { prompt: "¿Cómo se escribe?", image: "🏠", correct: "CASA", options: ["CASA", "COSA", "CAMA", "MASA"] },
  { prompt: "¿Cómo se escribe?", image: "☀️", correct: "SOL", options: ["SOL", "SAL", "SUR", "SIN"] },
  { prompt: "¿Cómo se escribe?", image: "🌙", correct: "LUNA", options: ["LUNA", "LUPA", "LANA", "LATA"] },
  { prompt: "¿Cómo se escribe?", image: "💧", correct: "AGUA", options: ["AGUA", "AGUJA", "ALTO", "AZUL"] },
  { prompt: "¿Cómo se escribe?", image: "🐕", correct: "PERRO", options: ["PERRO", "PERA", "PESO", "PERO"] },
  { prompt: "¿Cómo se escribe?", image: "🐟", correct: "PEZ", options: ["PEZ", "PAN", "PIE", "PAZ"] },
  { prompt: "¿Cómo se escribe?", image: "🌳", correct: "ÁRBOL", options: ["ÁRBOL", "AROS", "ARMA", "AZUL"] },
  { prompt: "¿Cómo se escribe?", image: "🎈", correct: "GLOBO", options: ["GLOBO", "GORRO", "GOLPE", "GRUPO"] },
  { prompt: "¿Cómo se escribe?", image: "📖", correct: "LIBRO", options: ["LIBRO", "LIBRE", "LITRO", "LINDO"] },
  { prompt: "¿Cómo se escribe?", image: "🍎", correct: "MANZANA", options: ["MANZANA", "MAÑANA", "MONTAÑA", "MADERA"] },
  { prompt: "¿Cómo se escribe?", image: "⭐", correct: "ESTRELLA", options: ["ESTRELLA", "ESCUELA", "ESPEJO", "ESFERA"] },
  { prompt: "¿Cómo se escribe?", image: "🌊", correct: "MAR", options: ["MAR", "MAS", "MAL", "MES"] },
  { prompt: "¿Cómo se escribe?", image: "🎵", correct: "MÚSICA", options: ["MÚSICA", "MUÑECA", "MESETA", "MEDUSA"] },
  { prompt: "¿Cómo se escribe?", image: "🦋", correct: "MARIPOSA", options: ["MARIPOSA", "MANZANA", "MALETA", "MASCOTA"] },
  { prompt: "¿Cómo se escribe?", image: "🌈", correct: "ARCOÍRIS", options: ["ARCOÍRIS", "ABANICO", "AMARILLO", "ANCIANO"] },
  { prompt: "¿Cómo se escribe?", image: "🐦", correct: "PÁJARO", options: ["PÁJARO", "PAYASO", "PASTEL", "PALOMA"] },
  { prompt: "¿Cómo se escribe?", image: "🍞", correct: "PAN", options: ["PAN", "PAZ", "PAR", "PEZ"] },
  { prompt: "¿Cómo se escribe?", image: "🎭", correct: "TEATRO", options: ["TEATRO", "TESORO", "TIEMPO", "TIERRA"] },
  { prompt: "¿Cómo se escribe?", image: "🏀", correct: "BALÓN", options: ["BALÓN", "BOTÓN", "BUZÓN", "BASTÓN"] },
  { prompt: "¿Cómo se escribe?", image: "🚗", correct: "CARRO", options: ["CARRO", "CERRO", "CORRO", "CURRO"] },
  { prompt: "¿Cómo se escribe?", image: "🎨", correct: "PINTURA", options: ["PINTURA", "PIEDRA", "PLANTA", "PUERTA"] },
  { prompt: "¿Cómo se escribe?", image: "🐸", correct: "RANA", options: ["RANA", "RAMA", "ROPA", "ROSA"] },
  { prompt: "¿Cómo se escribe?", image: "🍌", correct: "BANANA", options: ["BANANA", "BARCO", "BOTELLA", "BUFANDA"] },
];

// ── Advanced: Phrase completion ──
const PHRASE_QS: GameQuestion[] = [
  { prompt: "Completa: 'El gato está en la ___'", correct: "MESA", options: ["MESA", "PELO", "ROJO", "ALTO"] },
  { prompt: "Completa: 'Mi mamá es muy ___'", correct: "BONITA", options: ["BONITA", "GRANDE", "RÁPIDO", "VERDE"] },
  { prompt: "Completa: 'El sol sale por la ___'", correct: "MAÑANA", options: ["MAÑANA", "NOCHE", "TARDE", "LLUVIA"] },
  { prompt: "Completa: 'Los pájaros ___ en el cielo'", correct: "VUELAN", options: ["VUELAN", "NADAN", "CORREN", "DUERMEN"] },
  { prompt: "Completa: 'El agua del ___ es salada'", correct: "MAR", options: ["MAR", "RÍO", "LAGO", "VASO"] },
  { prompt: "Completa: 'La ___ brilla en la noche'", correct: "LUNA", options: ["LUNA", "MESA", "SILLA", "PUERTA"] },
  { prompt: "Completa: 'Los niños ___ en el parque'", correct: "JUEGAN", options: ["JUEGAN", "COCINAN", "LEEN", "DUERMEN"] },
  { prompt: "Completa: 'El perro mueve la ___'", correct: "COLA", options: ["COLA", "MESA", "OLLA", "BOLA"] },
  { prompt: "Completa: 'Las flores son muy ___'", correct: "BONITAS", options: ["BONITAS", "RÁPIDAS", "PESADAS", "FRÍAS"] },
  { prompt: "Completa: 'Mi papá ___ el carro'", correct: "MANEJA", options: ["MANEJA", "COCINA", "PINTA", "CANTA"] },
  { prompt: "Completa: 'El hielo es muy ___'", correct: "FRÍO", options: ["FRÍO", "DULCE", "SUAVE", "ALTO"] },
  { prompt: "Completa: 'La maestra nos ___ en la escuela'", correct: "ENSEÑA", options: ["ENSEÑA", "BAÑA", "PEINA", "ABRAZA"] },
  { prompt: "Completa: 'El bebé ___ cuando tiene hambre'", correct: "LLORA", options: ["LLORA", "CANTA", "BAILA", "SALTA"] },
  { prompt: "Completa: 'Las estrellas brillan en el ___'", correct: "CIELO", options: ["CIELO", "SUELO", "PISO", "MURO"] },
  { prompt: "Completa: 'El libro tiene muchas ___'", correct: "PÁGINAS", options: ["PÁGINAS", "PUERTAS", "PIEDRAS", "PELOTAS"] },
  { prompt: "Completa: 'La abuela cuenta ___'", correct: "CUENTOS", options: ["CUENTOS", "MONEDAS", "ZAPATOS", "VENTANAS"] },
  { prompt: "Completa: 'En invierno hace mucho ___'", correct: "FRÍO", options: ["FRÍO", "CALOR", "VIENTO", "SOL"] },
  { prompt: "Completa: 'El arcoíris tiene muchos ___'", correct: "COLORES", options: ["COLORES", "SONIDOS", "SABORES", "TAMAÑOS"] },
  { prompt: "Completa: 'Mi hermano ___ al fútbol'", correct: "JUEGA", options: ["JUEGA", "COCINA", "PINTA", "COSE"] },
  { prompt: "Completa: 'La tortuga camina muy ___'", correct: "LENTO", options: ["LENTO", "RÁPIDO", "ALTO", "FUERTE"] },
  { prompt: "Completa: 'Los peces viven en el ___'", correct: "AGUA", options: ["AGUA", "AIRE", "FUEGO", "TIERRA"] },
  { prompt: "Completa: 'Nos lavamos las ___ antes de comer'", correct: "MANOS", options: ["MANOS", "OREJAS", "RODILLAS", "CEJAS"] },
  { prompt: "Completa: 'El avión vuela por el ___'", correct: "CIELO", options: ["CIELO", "MAR", "BOSQUE", "CAMINO"] },
  { prompt: "Completa: 'La manzana es de color ___'", correct: "ROJA", options: ["ROJA", "AZUL", "NEGRA", "BLANCA"] },
  { prompt: "Completa: 'El elefante es un animal muy ___'", correct: "GRANDE", options: ["GRANDE", "PEQUEÑO", "RÁPIDO", "DELGADO"] },
  { prompt: "Completa: 'Usamos el paraguas cuando ___'", correct: "LLUEVE", options: ["LLUEVE", "NIEVA", "BRILLA", "CANTA"] },
  { prompt: "Completa: 'El payaso nos hace ___'", correct: "REÍR", options: ["REÍR", "LLORAR", "DORMIR", "CORRER"] },
];

// ── Question generators ──
export function getQuestionsForLevel(difficulty: string, level: number): GameQuestion[] {
  const count = 5;

  if (difficulty === "basic") {
    if (level <= 3) return pick(VOWEL_QS, count);
    if (level <= 6) return pick(ALPHABET_QS, count);
    return pick(NUMBER_QS, count);
  }

  if (difficulty === "normal") {
    return pick(WORD_QS, count);
  }

  if (difficulty === "advanced" || difficulty === "difficult") {
    return pick(PHRASE_QS, count);
  }

  return pick(VOWEL_QS, count);
}

// ── Level unlock logic ──
export function isLevelUnlocked(difficulty: string, level: number, completedLevels: number[]): boolean {
  const diffOffset: Record<string, number> = { basic: 0, normal: 9, advanced: 18, difficult: 27 };
  const offset = diffOffset[difficulty] || 0;

  if (level === 1) return true; // First level always unlocked
  // Previous level in same difficulty must be completed
  return completedLevels.includes(offset + level - 1);
}

export function getLevelGlobalId(difficulty: string, level: number): number {
  const diffOffset: Record<string, number> = { basic: 0, normal: 9, advanced: 18, difficult: 27 };
  return (diffOffset[difficulty] || 0) + level;
}
