import React, { useState } from "react";
import { Goal } from "../types";
import formatCurrencyBRL from "../utils/format";

interface PlanningScreenProps {
  goals: Goal[];
  onAddGoal: (data: { name: string; amount: number }) => void;
}

const PlanningScreen: React.FC<PlanningScreenProps> = ({ goals, onAddGoal }) => {
  const [name, setName] = useState("");
  const [amountText, setAmountText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const normalized = amountText.replace(",", ".").trim();
    const amount = Number(normalized);

    if (!name.trim() || !amount || isNaN(amount)) {
      return; // protótipo simples: não faz nada se estiver inválido
    }

    onAddGoal({ name: name.trim(), amount });

    // limpa campos
    setName("");
    setAmountText("");
  }

  const totalGoals = goals.reduce((sum, g) => sum + g.amount, 0);

  return (
    <div className="flex-1 flex flex-col gap-3 pb-4">
      <h2 className="text-lg font-semibold text-slate-50">
        Planejamento do mês
      </h2>
      <p className="text-[12px] text-slate-300">
        Defina metas simples para manter o foco. Este protótipo grava as metas
        somente em memória (sem salvar em banco).
      </p>

      {/* Formulário de nova meta */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-slate-900 border border-slate-800 p-3 space-y-2"
      >
        <p className="text-[12px] text-slate-200 font-medium">
          Nova meta
        </p>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-300">Nome da meta</label>
          <input
            className="h-9 rounded-lg bg-slate-800 border border-slate-700 px-2 text-xs text-slate-100 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Guardar dinheiro para reserva"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-300">Valor alvo (R$)</label>
          <input
            className="h-9 rounded-lg bg-slate-800 border border-slate-700 px-2 text-xs text-slate-100 outline-none"
            value={amountText}
            onChange={(e) => setAmountText(e.target.value)}
            placeholder="Ex.: 1000,00"
          />
        </div>
        <button
          type="submit"
          className="mt-2 w-full h-9 rounded-lg bg-emerald-400 text-slate-900 text-xs font-semibold"
        >
          Adicionar meta
        </button>
      </form>

      {/* Lista de metas */}
      <div className="flex-1 overflow-y-auto scroll-area space-y-2 pr-1">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[12px] text-slate-200 font-medium">
            Minhas metas
          </p>
          <span className="text-[11px] text-slate-400">
            Total planejado:{" "}
            <span className="text-emerald-300">
              {formatCurrencyBRL(totalGoals)}
            </span>
          </span>
        </div>

        {goals.length === 0 ? (
          <p className="text-[11px] text-slate-500">
            Nenhuma meta cadastrada ainda. Use o formulário acima para criar a
            primeira.
          </p>
        ) : (
          goals.map((goal) => (
            <div
              key={goal.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-3 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="text-[13px] text-slate-100">
                  {goal.name}
                </span>
                <span className="text-[11px] text-slate-400">
                  Valor alvo
                </span>
              </div>
              <span className="text-[13px] font-semibold text-emerald-300">
                {formatCurrencyBRL(goal.amount)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlanningScreen;
