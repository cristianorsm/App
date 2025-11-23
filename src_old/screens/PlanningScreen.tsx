import React from "react";
import GoalRow from "../components/GoalRow";

const PlanningScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col gap-3 pb-5">
      <div className="mt-1">
        <h2 className="text-lg font-semibold text-slate-50">Planejamento</h2>
        <p className="text-[11px] text-slate-400">Defina metas simples e acompanhe sem estresse.</p>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-300">Limite de gastos essenciais</span>
          <span className="text-[11px] text-slate-400">R$ 2.000 / mês</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full w-2/3 bg-emerald-400/80" />
        </div>
        <span className="text-[10px] text-slate-400">Você já usou 68% do limite. Ainda está sob controle. 👍</span>
      </div>

      <div className="space-y-2">
        <GoalRow title="Reserva de emergência" desc="Guardar R$ 500,00 este mês" progress={0.4} />
        <GoalRow title="Quitar cartão de crédito" desc="Zerar fatura até o dia 10" progress={0.7} />
        <GoalRow title="Investir todo dia 05" desc="Aplicar R$ 150,00 em renda fixa" progress={0.2} />
      </div>
    </div>
  );
};

export default PlanningScreen;
