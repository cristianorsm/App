import React from "react";
import { Screen } from "../types";

interface BottomNavProps {
  current: Screen;
  onChange: (s: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ current, onChange }) => {
  const isAuth = current === "login";
  if (isAuth) {
    // Em tela de login, escondemos a bottom bar
    return <div className="h-4" />;
  }

  const Item = ({
    id,
    label,
    icon,
  }: {
    id: Screen;
    label: string;
    icon: string;
  }) => {
    const active = current === id;
    return (
      <button
        onClick={() => onChange(id)}
        className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] py-2 ${
          active ? "text-emerald-300" : "text-slate-500"
        }`}
      >
        <span className="text-sm">{icon}</span>
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="h-14 border-t border-slate-800 bg-slate-950/90 flex items-center justify-around">
      <Item id="home" label="Início" icon="🏠" />
      <Item id="transactions" label="Transações" icon="📊" />
      <Item id="planning" label="Planejar" icon="🎯" />
      <Item id="profile" label="Perfil" icon="👤" />
    </div>
  );
};

export default BottomNav;
