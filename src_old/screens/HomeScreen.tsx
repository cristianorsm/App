import React, { useEffect, useRef, useState } from "react";
import TransactionRow from "./components/TransactionRow";
import { Transaction } from "./types";
import formatCurrencyBRL from "./utils/format";

interface HomeProps {
  goTransactions: () => void;
  goPlanning: () => void;
  transactions: Transaction[];
  monthlyGoal: number;
  currentDate: string;
  currentDateLabel: string;
  onAddIncome: (data: { label: string; category: string; amount: number }) => void;
}

const HomeScreen: React.FC<HomeProps> = ({
  goTransactions,
  goPlanning,
  transactions,
  monthlyGoal,
  currentDate,
  currentDateLabel,
  onAddIncome,
}) => {
  const totalIn = transactions
    .filter((t) => t.type === "in")
    .reduce((s, t) => s + t.amount, 0);
  const totalOut = transactions
    .filter((t) => t.type === "out")
    .reduce((s, t) => s + t.amount, 0);
  const balance = totalIn - totalOut;
  const progress = monthlyGoal > 0 ? Math.min(balance / monthlyGoal, 1) : 0;
  const progressPercent = Math.max(0, Math.min(progress * 100, 100));
  const progressRef = useRef<HTMLDivElement | null>(null);

  const todayTransactions = transactions
    .filter((t) => t.date === currentDate)
    .slice(0, 3);

  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [incomeLabel, setIncomeLabel] = useState("Entrada extra");
  const [incomeCategory, setIncomeCategory] = useState("Renda extra");
  const [incomeAmount, setIncomeAmount] = useState("");

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${progressPercent}%`;
    }
  }, [progressPercent]);

  function handleSaveIncome(e: React.FormEvent) {
    e.preventDefault();
    const normalized = incomeAmount.replace(",", ".").trim();
    const amount = Number(normalized);

    if (!amount || isNaN(amount)) {
      return;
    }

    onAddIncome({
      label: incomeLabel || "Nova entrada",
      category: incomeCategory || "Renda extra",
      amount,
    });

    setShowIncomeModal(false);
    setIncomeAmount("");
  }

  return (
    <div className="flex-1 flex flex-col gap-3 pb-20">
      {/* Headline */}
      <div className="flex items-center justify-between mt-0">
        <div>
          <p className="text-[10px] sm:text-[11px] text-slate-400">
            Olá, Cristiano 👋
          </p>
          <h2 className="text-lg sm:text-2xl font-semibold text-slate-50">
            Visão geral do mês
          </h2>
        </div>
        <button className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-sm text-slate-300">
          ⚙
        </button>
      </div>

      {/* Saldo card */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-sky-400 p-3 text-slate-950 shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-medium opacity-80">Saldo disponível</p>
            <p className="text-xl font-semibold mt-1 tracking-tight">
              {formatCurrencyBRL(balance)}
            </p>
          </div>
          <div className="text-right text-[10px] opacity-80">
            <p>Meta do mês</p>
            <p className="font-semibold">{formatCurrencyBRL(monthlyGoal)}</p>
          </div>
        </div>
        <div className="mt-4 w-full bg-slate-900/20 h-2 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-slate-950/40 rounded-full w-0 transition-all duration-700 ease-out"
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px]">
          <span>{Math.round(progress * 100)}% da meta concluída</span>
          <span>
            {balance < monthlyGoal
              ? `Faltam ${formatCurrencyBRL(monthlyGoal - balance)}`
              : "Meta alcançada 🚀"}
          </span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Entradas com botão Editar */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] text-slate-400">Entradas</p>
              <p className="text-sm font-semibold text-emerald-300 mt-1">
                + {formatCurrencyBRL(totalIn)}
              </p>
              <span className="text-[10px] text-emerald-400 mt-1">
                (exemplo) +12% vs. mês passado
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowIncomeModal(true)}
              className="text-[10px] text-emerald-300 hover:underline underline-offset-2"
            >
              Editar
            </button>
          </div>
        </div>

        {/* Saídas */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 flex flex-col justify-between">
          <p className="text-[11px] text-slate-400">Saídas</p>
          <p className="text-sm font-semibold text-rose-300 mt-1">
            - {formatCurrencyBRL(totalOut)}
          </p>
          <span className="text-[10px] text-rose-400 mt-1">
            (exemplo) -5% vs. mês passado
          </span>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="flex gap-2">
        <button
          onClick={goTransactions}
          className="flex-1 h-12 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 flex items-center justify-center gap-3"
        >
          <span>📒</span>
          <span>Ver transações</span>
        </button>
        <button
          onClick={goPlanning}
          className="flex-1 h-12 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 flex items-center justify-center gap-3"
        >
          <span>🎯</span>
          <span>Planejar mês</span>
        </button>
      </div>

      {/* Quick list */}
      <div className="mt-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-300 font-medium">
            {currentDateLabel}
          </span>
          <button
            className="text-[10px] text-emerald-300"
            onClick={goTransactions}
          >
            Ver tudo
          </button>
        </div>

        {todayTransactions.length === 0 ? (
          <p className="text-[11px] text-slate-500">
            Nenhuma transação registrada para hoje.
          </p>
        ) : (
          <div className="space-y-2">
            {todayTransactions.map((t) => (
              <TransactionRow
                key={t.id}
                label={t.label}
                category={t.category}
                value={`${t.type === "in" ? "+ " : "- "}${formatCurrencyBRL(
                  t.amount
                )}`}
                type={t.type}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de nova entrada */}
      {showIncomeModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
          <div className="w-[320px] rounded-2xl bg-slate-900 border border-slate-700 p-4">
            <h3 className="text-sm font-semibold text-slate-50 mb-2">
              Nova entrada
            </h3>
            <form className="flex flex-col gap-2" onSubmit={handleSaveIncome}>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-slate-300">Descrição</label>
                <input
                  className="h-9 rounded-lg bg-slate-800 border border-slate-700 px-2 text-xs text-slate-100 outline-none"
                  value={incomeLabel}
                  onChange={(e) => setIncomeLabel(e.target.value)}
                  placeholder="Ex.: Bico, bônus, etc."
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-slate-300">Categoria</label>
                <input
                  className="h-9 rounded-lg bg-slate-800 border border-slate-700 px-2 text-xs text-slate-100 outline-none"
                  value={incomeCategory}
                  onChange={(e) => setIncomeCategory(e.target.value)}
                  placeholder="Ex.: Renda extra"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-slate-300">
                  Valor (R$)
                </label>
                <input
                  className="h-9 rounded-lg bg-slate-800 border border-slate-700 px-2 text-xs text-slate-100 outline-none"
                  value={incomeAmount}
                  onChange={(e) => setIncomeAmount(e.target.value)}
                  placeholder="Ex.: 350,00"
                />
              </div>

              <div className="mt-3 flex justify-end gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => setShowIncomeModal(false)}
                  className="px-3 py-1 rounded-lg border border-slate-600 text-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-lg bg-emerald-400 text-slate-900 font-medium"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
