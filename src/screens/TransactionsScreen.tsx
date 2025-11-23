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

// Definição de quais categorias entram em cada filtro
const filterCategories: Record<FilterKey, string[] | null> = {
  all: null, // mostra tudo
  essenciais: [
    "Essencial",
    "Saúde",
    "Moradia",
    "Mobilidade",
    "Serviços",
    "Renda fixa",
  ],
  assinaturas: ["Assinaturas"],
  lazer: ["Lazer"],
};

const TransactionsScreen: React.FC<TransactionsScreenProps> = ({
  transactions,
  currentDate,
}) => {
  const [filter, setFilter] = useState<FilterKey>("all");

  // controla abertura do modal de filtro
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilter, setTempFilter] = useState<FilterKey>("all");

  // Totais gerais
  const totalIn = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "in")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalOut = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "out")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = totalIn - totalOut;

  // Aplica filtro
  const filteredTransactions = useMemo(() => {
    const cats = filterCategories[filter];
    if (!cats) return transactions;
    return transactions.filter((t) => cats.includes(t.category));
  }, [transactions, filter]);

  // Agrupa por data
  const groupedByDate = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};

    for (const t of filteredTransactions) {
      if (!groups[t.date]) groups[t.date] = [];
      groups[t.date].push(t);
    }

    const orderedDates = Object.keys(groups).sort().reverse();

    return orderedDates.map((date) => ({
      date,
      items: groups[date],
    }));
  }, [filteredTransactions]);

  function dateLabel(date: string): string {
    if (date === currentDate) return "Hoje";
    return date.split("-").reverse().join("/");
  }

  function openFilter() {
    setTempFilter(filter); // começa com o filtro atual
    setIsFilterOpen(true);
  }

  function applyFilter() {
    setFilter(tempFilter);
    setIsFilterOpen(false);
  }

  function cancelFilter() {
    setIsFilterOpen(false);
  }

  return (
    <div className="flex-1 flex flex-col gap-3 pb-4">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mt-1">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">Transações</h2>
          <p className="text-[11px] text-slate-400">
            Resumo detalhado do mês atual
          </p>
        </div>
        <button
          className="text-[11px] text-emerald-300"
          onClick={openFilter}
        >
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

      {/* Chips de filtro (continuam aparecendo) */}
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

      {/* Lista agrupada com rolagem */}
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

      {/* Modal de filtro */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-30 flex items-start justify-center bg-black/40 pt-20">
          <div className="w-[320px] rounded-2xl bg-slate-900 border border-slate-700 p-4">
            <h3 className="text-sm font-semibold text-slate-50 mb-2">
              Filtrar transações
            </h3>

            <div className="flex flex-col gap-2 text-[12px] text-slate-200">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-emerald-400"
                  checked={tempFilter === "all"}
                  onChange={() => setTempFilter("all")}
                />
                <span>Todos</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-emerald-400"
                  checked={tempFilter === "essenciais"}
                  onChange={() => setTempFilter("essenciais")}
                />
                <span>Essenciais</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-emerald-400"
                  checked={tempFilter === "assinaturas"}
                  onChange={() => setTempFilter("assinaturas")}
                />
                <span>Assinaturas</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-emerald-400"
                  checked={tempFilter === "lazer"}
                  onChange={() => setTempFilter("lazer")}
                />
                <span>Lazer</span>
              </label>
            </div>

            <div className="mt-4 flex justify-end gap-2 text-[11px]">
              <button
                type="button"
                onClick={cancelFilter}
                className="px-3 py-1 rounded-lg border border-slate-600 text-slate-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={applyFilter}
                className="px-3 py-1 rounded-lg bg-emerald-400 text-slate-900 font-medium"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsScreen;
