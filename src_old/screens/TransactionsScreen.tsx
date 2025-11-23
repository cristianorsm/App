import React, { useMemo, useState } from "react";
import DayGroup from "../components/DayGroup";
import TransactionRow from "../components/TransactionRow";
import { Transaction } from "../types";
import formatCurrencyBRL from "../utils/format";

interface TransactionsScreenProps {
  transactions: Transaction[];
  currentDate: string; // yyyy-mm-dd
}

type FilterKey = "all" | "essenciais" | "assinaturas" | "lazer";

const categoryMap: Record<FilterKey, string[] | null> = {
  all: null,
  essenciais: ["Essencial"],
  assinaturas: ["Assinaturas"],
  lazer: ["Lazer"],
};

const TransactionsScreen: React.FC<TransactionsScreenProps> = ({
  transactions,
  currentDate,
}) => {
  const [filter, setFilter] = useState<FilterKey>("all");

  // === Totais gerais ===
  const totalIn = useMemo(
    () => transactions.filter((t) => t.type === "in").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const totalOut = useMemo(
    () => transactions.filter((t) => t.type === "out").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const balance = totalIn - totalOut;

  // === Filtro por categoria ===
  const filteredTransactions = useMemo(() => {
    const categories = categoryMap[filter];
    if (!categories) return transactions;
    return transactions.filter((t) => categories.includes(t.category));
  }, [transactions, filter]);

  // === Agrupamento por data ===
  const groupedByDate = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};
    for (const t of filteredTransactions) {
      if (!groups[t.date]) groups[t.date] = [];
      groups[t.date].push(t);
    }
    // ordenar datas decrescente
    const orderedDates = Object.keys(groups).sort().reverse();
    return orderedDates.map((date) => ({
      date,
      items: groups[date],
    }));
  }, [filteredTransactions]);

  // helper para rotulo de data
  function dateLabel(date: string): string {
    if (date === currentDate) return "Hoje";
    return date.split("-").reverse().join("/"); // 22/11/2025
  }

  return (
    <div className="flex-1 flex flex-col gap-3 pb-5">
      {/* Header */}
      <div className="flex items-center justify-between mt-1">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">Transações</h2>
          <p className="text-[11px] text-slate-400">
            Resumo detalhado do mês atual
          </p>
        </div>
        <button className="text-[11px] text-emerald-300">
          Filtrar
        </button>
      </div>

      {/* Card de saldo do período */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 flex justify-between items-center">
        <div>
          <p className="text-[11px] text-slate-400">Saldo do período</p>
          <p className="text-lg text-slate-50 font-semibold mt-1">
            {formatCurrencyBRL(balance)}
          </p>
        </div>
        <div className="text-right text-[10px] text-slate-400">
          <p>
            Entradas:{" "}
            <span className="text-emerald-300">
              {formatCurrencyBRL(totalIn)}
            </span>
          </p>
          <p>
            Saídas:{" "}
            <span className="text-rose-300">
              {formatCurrencyBRL(totalOut)}
            </span>
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 text-[11px]">
        <button
          onClick={() => setFilter("all")}
          className={
            "px-3 py-1 rounded-full border " +
            (filter === "all"
              ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/40"
              : "bg-slate-900 border-slate-700 text-slate-300")
          }
        >
          Todos
        </button>
        <button
          onClick={() => setFilter("essenciais")}
          className={
            "px-3 py-1 rounded-full border " +
            (filter === "essenciais"
              ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/40"
              : "bg-slate-900 border-slate-700 text-slate-300")
          }
        >
          Essenciais
        </button>
        <button
          onClick={() => setFilter("assinaturas")}
          className={
            "px-3 py-1 rounded-full border " +
            (filter === "assinaturas"
              ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/40"
              : "bg-slate-900 border-slate-700 text-slate-300")
          }
        >
          Assinaturas
        </button>
        <button
          onClick={() => setFilter("lazer")}
          className={
            "px-3 py-1 rounded-full border " +
            (filter === "lazer"
              ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/40"
              : "bg-slate-900 border-slate-700 text-slate-300")
          }
        >
          Lazer
        </button>
      </div>

      {/* Lista agrupada */}
<div className="flex-1 overflow-y-auto mt-1 space-y-3 scroll-area pr-1">
  {groupedByDate.length === 0 ? (
    <p className="text-[11px] text-slate-500">
      Nenhuma transação encontrada para este filtro.
    </p>
  ) : (
    groupedByDate.map((group) => (
      <DayGroup key={group.date} date={dateLabel(group.date)}>
        {group.items.map((t) => (
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
      </DayGroup>
    ))
  )}
</div>

    </div>
  );
};

export default TransactionsScreen;
