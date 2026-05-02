import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "es" | "en" | "pt" | "fr";

const translations: Record<Lang, Record<string, string>> = {
  es: {
    "app.title": "Modi",
    "app.subtitle": "¡Aprende jugando! 🎮",
    "app.greeting": "¡Hola! Soy {name}. ¿Listo para aprender? 🐰",
    "menu.start": "Comenzar",
    "menu.progress": "Progreso",
    "menu.store": "Tienda",
    "menu.settings": "Configuración",
    "menu.language": "Lenguaje",
    "difficulty.basic": "Básico",
    "difficulty.normal": "Normal",
    "difficulty.advanced": "Avanzado",
    "difficulty.difficult": "Difícil",
    "difficulty.basic_desc": "Vocales, abecedario y números",
    "difficulty.normal_desc": "Construye tus primeras palabras",
    "difficulty.advanced_desc": "Completa frases completas",
    "difficulty.difficult_desc": "Frases con temporizador de 40s",
    "difficulty.hint": "¡Elige un modo de dificultad! 🎯",
    "levels.title": "Niveles",
    "levels.hint": "¡Hola! Selecciona un nivel para comenzar a aprender 📚",
    "levels.vowels": "Vocales",
    "levels.vowels1": "Vocales 1",
    "levels.vowels2": "Vocales 2",
    "levels.vowels3": "Vocales 3",
    "levels.abc1": "ABC 1",
    "levels.abc2": "ABC 2",
    "levels.abc3": "ABC 3",
    "levels.num1": "Números 1",
    "levels.num2": "Números 2",
    "levels.num3": "Números 3",
    "levels.level": "Nivel",
    "coming_soon.title": "¡Próximamente!",
    "coming_soon.text": "Estamos preparando nuevas lecciones para ti. ¡Vuelve pronto! 🚀",
    "coming_soon.ok": "Entendido",
    "game.which_vowel": "¿Cuál es esta vocal?",
    "game.starts_with": "¿Con qué vocal empieza '{word}'?",
    "victory.title": "¡Excelente!",
    "victory.text": "¡Lo lograste! 🎉",
    "victory.continue": "Continuar",
    "defeat.title": "¡Sigue intentando!",
    "defeat.text": "No te rindas, tú puedes 💪",
    "defeat.retry": "Reintentar",
    "progress.title": "Mi Progreso",
    "progress.levels_completed": "Niveles completados",
    "progress.total_failures": "Intentos fallidos",
    "progress.total_clicks": "Clicks totales",
    "progress.history": "Historial",
    "progress.victory": "Victoria",
    "progress.defeat": "Derrota",
    "progress.no_data": "¡Aún no hay datos! Comienza a jugar 🎮",
    "settings.title": "Configuración",
    "settings.sound": "Sonido",
    "settings.bg_color": "Color de fondo",
    "settings.language": "Idioma",
    "settings.back": "Volver",
    "store.title": "Tienda",
    "store.hint": "¡Desbloquea trajes completando niveles! 🎽",
    "store.farmer": "Granjero",
    "store.astronaut": "Astronauta",
    "store.robot": "Robot",
    "store.blocks": "Bloques",
    "store.unlocked": "Desbloqueado",
    "store.levels": "niveles",
    "lang.es": "Español",
    "lang.en": "English",
    "lang.pt": "Português",
    "lang.fr": "Français",
  },
  en: {
    "app.title": "Modi",
    "app.subtitle": "Learn by playing! 🎮",
    "app.greeting": "Hi! I'm {name}. Ready to learn? 🐰",
    "menu.start": "Start",
    "menu.progress": "Progress",
    "menu.store": "Store",
    "menu.settings": "Settings",
    "menu.language": "Language",
    "difficulty.basic": "Basic",
    "difficulty.normal": "Normal",
    "difficulty.advanced": "Advanced",
    "difficulty.difficult": "Difficult",
    "difficulty.basic_desc": "Vowels, alphabet and numbers",
    "difficulty.normal_desc": "Build your first words",
    "difficulty.advanced_desc": "Complete full phrases",
    "difficulty.difficult_desc": "Phrases with 40s timer",
    "difficulty.hint": "Choose a difficulty mode! 🎯",
    "levels.title": "Levels",
    "levels.hint": "Hi! Select a level to start learning 📚",
    "levels.vowels": "Vowels",
    "levels.vowels1": "Vowels 1", "levels.vowels2": "Vowels 2", "levels.vowels3": "Vowels 3",
    "levels.abc1": "ABC 1", "levels.abc2": "ABC 2", "levels.abc3": "ABC 3",
    "levels.num1": "Numbers 1", "levels.num2": "Numbers 2", "levels.num3": "Numbers 3",
    "levels.level": "Level",
    "coming_soon.title": "Coming Soon!",
    "coming_soon.text": "We're preparing new lessons for you. Come back soon! 🚀",
    "coming_soon.ok": "Got it",
    "game.which_vowel": "Which vowel is this?",
    "game.starts_with": "What vowel does '{word}' start with?",
    "victory.title": "Excellent!", "victory.text": "You did it! 🎉", "victory.continue": "Continue",
    "defeat.title": "Keep trying!", "defeat.text": "Don't give up, you can do it! 💪", "defeat.retry": "Retry",
    "progress.title": "My Progress", "progress.levels_completed": "Levels completed",
    "progress.total_failures": "Failed attempts", "progress.total_clicks": "Total clicks",
    "progress.history": "History", "progress.victory": "Victory", "progress.defeat": "Defeat",
    "progress.no_data": "No data yet! Start playing 🎮",
    "settings.title": "Settings", "settings.sound": "Sound", "settings.bg_color": "Background color",
    "settings.language": "Language", "settings.back": "Back",
    "store.title": "Store", "store.hint": "Unlock costumes by completing levels! 🎽",
    "store.farmer": "Farmer", "store.astronaut": "Astronaut", "store.robot": "Robot", "store.blocks": "Blocks",
    "store.unlocked": "Unlocked", "store.levels": "levels",
    "lang.es": "Español", "lang.en": "English", "lang.pt": "Português", "lang.fr": "Français",
  },
  pt: {
    "app.title": "Modi", "app.subtitle": "Aprenda brincando! 🎮",
    "app.greeting": "Olá! Eu sou {name}. Pronto para aprender? 🐰",
    "menu.start": "Começar", "menu.progress": "Progresso", "menu.store": "Loja",
    "menu.settings": "Configurações", "menu.language": "Idioma",
    "difficulty.basic": "Básico", "difficulty.normal": "Normal", "difficulty.advanced": "Avançado", "difficulty.difficult": "Difícil",
    "difficulty.basic_desc": "Vogais, alfabeto e números", "difficulty.normal_desc": "Construa suas primeiras palavras",
    "difficulty.advanced_desc": "Complete frases completas", "difficulty.difficult_desc": "Frases com timer de 40s",
    "difficulty.hint": "Escolha um modo de dificuldade! 🎯",
    "levels.title": "Níveis", "levels.hint": "Olá! Selecione um nível para começar a aprender 📚",
    "levels.vowels": "Vogais", "levels.vowels1": "Vogais 1", "levels.vowels2": "Vogais 2", "levels.vowels3": "Vogais 3",
    "levels.abc1": "ABC 1", "levels.abc2": "ABC 2", "levels.abc3": "ABC 3",
    "levels.num1": "Números 1", "levels.num2": "Números 2", "levels.num3": "Números 3", "levels.level": "Nível",
    "coming_soon.title": "Em breve!", "coming_soon.text": "Estamos preparando novas lições para você. Volte em breve! 🚀", "coming_soon.ok": "Entendi",
    "game.which_vowel": "Qual é esta vogal?", "game.starts_with": "Com qual vogal começa '{word}'?",
    "victory.title": "Excelente!", "victory.text": "Você conseguiu! 🎉", "victory.continue": "Continuar",
    "defeat.title": "Continue tentando!", "defeat.text": "Não desista, você consegue! 💪", "defeat.retry": "Tentar novamente",
    "progress.title": "Meu Progresso", "progress.levels_completed": "Níveis completados",
    "progress.total_failures": "Tentativas falhadas", "progress.total_clicks": "Cliques totais",
    "progress.history": "Histórico", "progress.victory": "Vitória", "progress.defeat": "Derrota",
    "progress.no_data": "Ainda sem dados! Comece a jogar 🎮",
    "settings.title": "Configurações", "settings.sound": "Som", "settings.bg_color": "Cor de fundo",
    "settings.language": "Idioma", "settings.back": "Voltar",
    "store.title": "Loja", "store.hint": "Desbloqueie trajes completando níveis! 🎽",
    "store.farmer": "Fazendeiro", "store.astronaut": "Astronauta", "store.robot": "Robô", "store.blocks": "Blocos",
    "store.unlocked": "Desbloqueado", "store.levels": "níveis",
    "lang.es": "Español", "lang.en": "English", "lang.pt": "Português", "lang.fr": "Français",
  },
  fr: {
    "app.title": "Modi", "app.subtitle": "Apprends en jouant ! 🎮",
    "app.greeting": "Salut ! Je suis {name}. Prêt à apprendre ? 🐰",
    "menu.start": "Commencer", "menu.progress": "Progrès", "menu.store": "Boutique",
    "menu.settings": "Paramètres", "menu.language": "Langue",
    "difficulty.basic": "Basique", "difficulty.normal": "Normal", "difficulty.advanced": "Avancé", "difficulty.difficult": "Difficile",
    "difficulty.basic_desc": "Voyelles, alphabet et chiffres", "difficulty.normal_desc": "Construis tes premiers mots",
    "difficulty.advanced_desc": "Complète des phrases entières", "difficulty.difficult_desc": "Phrases avec chrono de 40s",
    "difficulty.hint": "Choisis un mode de difficulté ! 🎯",
    "levels.title": "Niveaux", "levels.hint": "Salut ! Sélectionne un niveau pour commencer à apprendre 📚",
    "levels.vowels": "Voyelles", "levels.vowels1": "Voyelles 1", "levels.vowels2": "Voyelles 2", "levels.vowels3": "Voyelles 3",
    "levels.abc1": "ABC 1", "levels.abc2": "ABC 2", "levels.abc3": "ABC 3",
    "levels.num1": "Chiffres 1", "levels.num2": "Chiffres 2", "levels.num3": "Chiffres 3", "levels.level": "Niveau",
    "coming_soon.title": "Bientôt !", "coming_soon.text": "Nous préparons de nouvelles leçons pour toi. Reviens vite ! 🚀", "coming_soon.ok": "Compris",
    "game.which_vowel": "Quelle est cette voyelle ?", "game.starts_with": "Par quelle voyelle commence '{word}' ?",
    "victory.title": "Excellent !", "victory.text": "Tu as réussi ! 🎉", "victory.continue": "Continuer",
    "defeat.title": "Continue d'essayer !", "defeat.text": "N'abandonne pas, tu peux le faire ! 💪", "defeat.retry": "Réessayer",
    "progress.title": "Mon Progrès", "progress.levels_completed": "Niveaux terminés",
    "progress.total_failures": "Tentatives échouées", "progress.total_clicks": "Clics totaux",
    "progress.history": "Historique", "progress.victory": "Victoire", "progress.defeat": "Défaite",
    "progress.no_data": "Pas encore de données ! Commence à jouer 🎮",
    "settings.title": "Paramètres", "settings.sound": "Son", "settings.bg_color": "Couleur de fond",
    "settings.language": "Langue", "settings.back": "Retour",
    "store.title": "Boutique", "store.hint": "Débloque des costumes en complétant des niveaux ! 🎽",
    "store.farmer": "Fermier", "store.astronaut": "Astronaute", "store.robot": "Robot", "store.blocks": "Blocs",
    "store.unlocked": "Débloqué", "store.levels": "niveaux",
    "lang.es": "Español", "lang.en": "English", "lang.pt": "Português", "lang.fr": "Français",
  },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem("modi-lang") as Lang) || "es";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("modi-lang", l);
  };

  const t = (key: string, params?: Record<string, string>) => {
    let text = translations[lang]?.[key] || translations.es[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider");
  return ctx;
};
