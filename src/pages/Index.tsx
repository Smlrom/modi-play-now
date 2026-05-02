import { useNavigate } from "react-router-dom";
import modiHappy from "@/assets/modi-rabbit-happy.png";
import { Play, BarChart3, ShoppingBag, Settings, Globe } from "lucide-react";

const MENU_ITEMS = [
  { label: "Comenzar", icon: Play, path: "/levels", color: "bg-primary text-primary-foreground" },
  { label: "Progreso", icon: BarChart3, path: "#", color: "bg-modi-green text-primary-foreground" },
  { label: "Tienda", icon: ShoppingBag, path: "#", color: "bg-modi-orange text-primary-foreground" },
  { label: "Configuración", icon: Settings, path: "#", color: "bg-modi-purple text-primary-foreground" },
  { label: "Lenguaje", icon: Globe, path: "#", color: "bg-secondary text-secondary-foreground" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      {/* Title */}
      <h1 className="font-display text-5xl text-primary tracking-wide mb-2">Modi</h1>
      <p className="font-body text-muted-foreground text-base font-semibold mb-6">
        ¡Aprende jugando! 🎮
      </p>

      {/* Rabbit */}
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl" />
        <img
          src={modiHappy}
          alt="Modi el conejito"
          className="relative w-48 h-48 animate-float"
          width={512}
          height={512}
        />
      </div>

      {/* Speech bubble */}
      <div className="bg-card rounded-2xl px-6 py-4 shadow-lg mb-8 max-w-xs text-center relative">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card rotate-45 shadow-sm" />
        <p className="font-body text-foreground text-sm font-semibold">
          ¡Hola! Soy <span className="text-primary font-bold">Modi</span>. ¿Listo para aprender? 🐰
        </p>
      </div>

      {/* Menu Buttons */}
      <div className="w-full max-w-xs flex flex-col gap-3">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => item.path !== "#" ? navigate(item.path) : null}
            className={`${item.color} rounded-2xl py-4 px-6 font-display text-lg flex items-center gap-4 shadow-lg hover:scale-[1.03] transition-transform duration-200`}
          >
            <item.icon className="w-6 h-6" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Index;
