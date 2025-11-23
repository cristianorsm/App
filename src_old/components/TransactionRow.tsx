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
    <div className="flex items-center justify-between rounded-2xl bg-slate-900 border border-slate-800 px-3 py-2.5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-2xl bg-slate-800 flex items-center justify-center text-xs">
          {isIn ? "⬆" : "⬇"}
        </div>
        <div>
          <p className="text-xs text-slate-50">{label}</p>
          <p className="text-[10px] text-slate-400">{category}</p>
        </div>
      </div>
      <div
        className={`text-xs font-semibold ${
          isIn ? "text-emerald-300" : "text-rose-300"
        }`}
      >
        {value}
      </div>
    </div>
  );
};

export default TransactionRow;
