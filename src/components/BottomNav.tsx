import React from "react";
import { Screen } from "../types";

interface BottomNavProps {
  current: Screen;
  onChange: (s: Screen) => void;
}

const items: { id: Screen; label: string; icon: string }[] = [
  { id: "home", label: "Início", icon: "🏠" },
  { id: "transactions", label: "Transações", icon: "📊" },
  { id: "planning", label: "Planejar", icon: "🎯" },
  { id: "profile", label: "Perfil", icon: "👤" },
];

const BottomNav: React.FC<BottomNavProps> = ({ current, onChange }) => {
  return (
    <nav className="h-16 bg-slate-950/90 border-t border-slate-800 flex items-center justify-around text-[11px] text-slate-400">
      {items.map((item) => {
        const active = current === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex flex-col items-center gap-0.5 ${
              active ? "text-emerald-300" : "text-slate-400"
            }`}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            <span className="leading-none">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
