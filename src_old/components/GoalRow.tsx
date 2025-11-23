import React from "react";

interface GoalRowProps {
  title: string;
  desc: string;
  progress: number; // 0 a 1
}

const GoalRow: React.FC<GoalRowProps> = ({ title, desc, progress }) => {
  const percent = Math.round(progress * 100);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-slate-50">{title}</p>
          <p className="text-[10px] text-slate-400">{desc}</p>
        </div>
        <span className="text-[10px] text-emerald-300">{percent}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
        <div className="h-full bg-emerald-400/80" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

export default GoalRow;
