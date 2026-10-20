import modiHappy from "@/assets/modi-rabbit-happy.png";

type ModiCharacterProps = {
  skinId?: string;
  size?: "small" | "medium" | "large";
  className?: string;
};

const outfits: Record<string, { accessory: string; coat: string; trim: string; label: string }> = {
  classic: { accessory: "", coat: "bg-transparent", trim: "border-transparent", label: "Modi clásico" },
  farmer: { accessory: "👒", coat: "bg-emerald-600", trim: "border-amber-300", label: "Traje de granjero" },
  astronaut: { accessory: "🪖", coat: "bg-sky-500", trim: "border-slate-200", label: "Traje de astronauta" },
  robot: { accessory: "📡", coat: "bg-slate-400", trim: "border-slate-600", label: "Traje de robot" },
  blocks: { accessory: "🧱", coat: "bg-orange-500", trim: "border-yellow-300", label: "Traje de bloques" },
};

const sizes = {
  small: { image: "w-16 h-16", outfit: "w-8 h-5 bottom-2", accessory: "text-lg -top-1" },
  medium: { image: "w-24 h-24", outfit: "w-11 h-7 bottom-3", accessory: "text-2xl top-0" },
  large: { image: "w-32 h-32", outfit: "w-14 h-9 bottom-4", accessory: "text-3xl top-1" },
};

export default function ModiCharacter({ skinId = "classic", size = "medium", className = "" }: ModiCharacterProps) {
  const outfit = outfits[skinId] ?? outfits.classic;
  const scale = sizes[size];

  return (
    <div className={`relative isolate inline-flex items-center justify-center ${scale.image} ${className}`} role="img" aria-label={`Modi — ${outfit.label}`}>
      <img src={modiHappy} alt="" className="absolute inset-0 w-full h-full object-contain" />
      {skinId !== "classic" && (
        <>
          <span className={`absolute left-1/2 -translate-x-1/2 ${scale.accessory} z-10 drop-shadow-sm`} aria-hidden="true">{outfit.accessory}</span>
          <span
            className={`absolute left-1/2 -translate-x-1/2 ${scale.outfit} rounded-t-xl rounded-b-md border-2 ${outfit.trim} ${outfit.coat} shadow-sm z-10`}
            aria-hidden="true"
          >
            {skinId === "farmer" && <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px]">🌻</span>}
            {skinId === "astronaut" && <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px]">⭐</span>}
            {skinId === "robot" && <span className="absolute inset-x-1/4 top-1/3 h-1 rounded bg-cyan-200" />}
            {skinId === "blocks" && <span className="absolute inset-1 grid grid-cols-2 gap-0.5"><i className="rounded-sm bg-red-500" /><i className="rounded-sm bg-blue-500" /><i className="rounded-sm bg-green-500" /><i className="rounded-sm bg-yellow-300" /></span>}
          </span>
        </>
      )}
    </div>
  );
}
