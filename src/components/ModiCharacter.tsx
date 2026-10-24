import modiHappy from "@/assets/modi-rabbit-happy.png";

type ModiCharacterProps = {
  skinId?: string;
  size?: "small" | "medium" | "large";
  className?: string;
};

const outfits: Record<string, { label: string }> = {
  classic: { label: "Modi clásico" },
  farmer: { label: "Traje de granjero" },
  astronaut: { label: "Traje de astronauta" },
  robot: { label: "Traje de robot" },
  blocks: { label: "Traje de bloques" },
};

const sizes = {
  small: "w-16 h-16",
  medium: "w-24 h-24",
  large: "w-32 h-32",
};

function Costume({ skinId }: { skinId: string }) {
  if (skinId === "farmer") {
    return (
      <>
        {/* Sombrero centrado sobre la cabeza */}
        <span className="absolute left-1/2 top-[17%] -translate-x-1/2 z-20 w-[42%] h-[6%] rounded-full bg-amber-700 border-b-2 border-amber-900 shadow-sm" aria-hidden="true" />
        <span className="absolute left-1/2 top-[10%] -translate-x-1/2 z-20 w-[27%] h-[10%] rounded-t-full bg-amber-400 border-2 border-amber-700 shadow-sm" aria-hidden="true" />
        {/* Overol ajustado al torso */}
        <span className="absolute left-[25%] top-[54%] z-10 w-[50%] h-[33%] rounded-t-xl rounded-b-[30%] bg-emerald-600 border-2 border-emerald-800 shadow-md" aria-hidden="true">
          <i className="absolute left-[15%] top-0 h-[72%] w-[14%] rounded-b bg-emerald-300 border-x border-emerald-800" />
          <i className="absolute right-[15%] top-0 h-[72%] w-[14%] rounded-b bg-emerald-300 border-x border-emerald-800" />
          <i className="absolute left-1/2 top-[38%] -translate-x-1/2 text-[8px] not-italic">🌻</i>
          <i className="absolute left-[18%] top-[9%] w-1 h-1 rounded-full bg-amber-300" />
          <i className="absolute right-[18%] top-[9%] w-1 h-1 rounded-full bg-amber-300" />
        </span>
      </>
    );
  }

  if (skinId === "astronaut") {
    return (
      <>
        {/* Visor amplio y transparente, sin tapar la cara */}
        <span className="absolute left-1/2 top-[12%] -translate-x-1/2 z-10 w-[62%] h-[43%] rounded-[46%] border-[3px] border-slate-100 bg-sky-300/15 shadow-[0_0_0_2px_rgba(56,189,248,0.8)]" aria-hidden="true">
          <i className="absolute right-[10%] top-[17%] w-[16%] h-[8%] rounded-full bg-white/80" />
        </span>
        {/* Traje alineado con el centro del cuerpo */}
        <span className="absolute left-[25%] top-[54%] z-10 w-[50%] h-[33%] rounded-xl bg-slate-100 border-2 border-slate-400 shadow-md" aria-hidden="true">
          <i className="absolute left-[28%] top-[18%] w-[44%] h-[30%] rounded bg-sky-500 border border-white" />
          <i className="absolute left-[40%] bottom-[12%] w-[20%] h-[20%] rounded-full bg-amber-400 border border-amber-600" />
          <i className="absolute left-[-12%] top-[28%] w-[13%] h-[42%] rounded-l bg-sky-400 border border-slate-400" />
          <i className="absolute right-[-12%] top-[28%] w-[13%] h-[42%] rounded-r bg-sky-400 border border-slate-400" />
        </span>
      </>
    );
  }

  if (skinId === "robot") {
    return (
      <>
        <span className="absolute left-1/2 top-[9%] -translate-x-1/2 z-10 h-[8%] w-[3%] bg-slate-500" aria-hidden="true" />
        <span className="absolute left-1/2 top-[5%] -translate-x-1/2 z-20 w-[13%] h-[8%] rounded-full bg-cyan-400 border-2 border-slate-500 shadow-sm" aria-hidden="true" />
        {/* Armadura centrada y ligeramente más ancha para seguir la silueta */}
        <span className="absolute left-[24%] top-[53%] z-10 w-[52%] h-[34%] rounded-xl bg-gradient-to-b from-slate-300 to-slate-500 border-2 border-slate-600 shadow-md" aria-hidden="true">
          <i className="absolute left-[14%] top-[20%] w-[20%] h-[18%] rounded-sm bg-cyan-300 border border-slate-600" />
          <i className="absolute right-[14%] top-[20%] w-[20%] h-[18%] rounded-sm bg-cyan-300 border border-slate-600" />
          <i className="absolute left-[20%] right-[20%] bottom-[17%] h-[13%] rounded-sm bg-slate-800" />
          <i className="absolute left-[-10%] top-[28%] w-[10%] h-[42%] rounded bg-slate-400 border border-slate-600" />
          <i className="absolute right-[-10%] top-[28%] w-[10%] h-[42%] rounded bg-slate-400 border border-slate-600" />
        </span>
      </>
    );
  }

  if (skinId === "blocks") {
    return (
      <>
        {/* Banda decorativa colocada en la frente */}
        <span className="absolute left-1/2 top-[17%] -translate-x-1/2 z-20 w-[36%] h-[8%] rounded-md bg-orange-500 border-2 border-amber-700 shadow-sm" aria-hidden="true">
          <i className="absolute left-[15%] top-[20%] w-[20%] h-[25%] rounded-full bg-amber-200" />
          <i className="absolute right-[15%] top-[20%] w-[20%] h-[25%] rounded-full bg-amber-200" />
        </span>
        {/* Pechera ajustada al torso */}
        <span className="absolute left-[25%] top-[54%] z-10 w-[50%] h-[33%] rounded-xl bg-orange-500 border-2 border-orange-800 shadow-md grid grid-cols-2 grid-rows-2 gap-0.5 p-1" aria-hidden="true">
          <i className="rounded-sm bg-red-500 border border-red-700" />
          <i className="rounded-sm bg-blue-500 border border-blue-700" />
          <i className="rounded-sm bg-green-500 border border-green-700" />
          <i className="rounded-sm bg-yellow-300 border border-yellow-600" />
        </span>
      </>
    );
  }

  return null;
}

export default function ModiCharacter({ skinId = "classic", size = "medium", className = "" }: ModiCharacterProps) {
  const outfit = outfits[skinId] ?? outfits.classic;

  return (
    <div
      className={"relative isolate inline-flex items-center justify-center " + sizes[size] + " " + className}
      role="img"
      aria-label={"Modi — " + outfit.label}
    >
      <img src={modiHappy} alt="" className="absolute inset-0 w-full h-full object-contain" />
      {skinId !== "classic" && <Costume skinId={skinId} />}
    </div>
  );
}
