import React from "react";

interface TransactionRowProps {
  label: string;
  category: string;
  value: string;
  type: "in" | "out";
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  label,
  category,
  value,
  type,
}) => {
  const isIn = type === "in";
  return (
    <div className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-3 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-200">
          {isIn ? "⬆" : "⬇"}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-slate-100">{label}</span>
          <span className="text-[11px] text-slate-400">{category}</span>
        </div>
      </div>
      <span
        className={`text-sm font-semibold ${
          isIn ? "text-emerald-300" : "text-rose-300"
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default TransactionRow;
