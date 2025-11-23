import React, { useState } from "react";
import { Preferences, CustomCategory, FocusGoal } from "../types";
import formatCurrencyBRL from "../utils/format";

interface ProfileScreenProps {
  preferences: Preferences;
  onUpdatePreferences: (patch: Partial<Preferences>) => void;

  categories: CustomCategory[];
  onAddCategory: (data: { name: string; type: "in" | "out" }) => void;
  onRemoveCategory: (id: number) => void;

  focusGoals: FocusGoal[];
  onAddFocusGoal: (data: { name: string; category: string; limit: number }) => void;
  onRemoveFocusGoal: (id: number) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  preferences,
  onUpdatePreferences,
  categories,
  onAddCategory,
  onRemoveCategory,
  focusGoals,
  onAddFocusGoal,
  onRemoveFocusGoal,
}) => {
  // estados locais para formulários
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryType, setNewCategoryType] = useState<"in" | "out">("out");

  const [focusName, setFocusName] = useState("");
  const [focusCategory, setFocusCategory] = useState("");
  const [focusLimitText, setFocusLimitText] = useState("");

  function handleAddCategorySubmit(e: React.FormEvent) {
    e.preventDefault();
    onAddCategory({ name: newCategoryName, type: newCategoryType });
    setNewCategoryName("");
  }

  function handleAddFocusGoalSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = focusLimitText.replace(",", ".").trim();
    const limit = Number(normalized);
    if (!limit || isNaN(limit)) return;

    onAddFocusGoal({
      name: focusName,
      category: focusCategory,
      limit,
    });

    setFocusName("");
    setFocusCategory("");
    setFocusLimitText("");
  }

  return (
    <div className="flex-1 flex flex-col gap-3 pb-4">
      <h2 className="text-lg font-semibold text-slate-50">Perfil</h2>

      {/* Bloco: informações básicas */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 space-y-1">
        <p className="text-[13px] text-slate-100 font-semibold">
          Cristiano Ribeiro
        </p>
        <p className="text-[11px] text-slate-400">
          Protótipo de perfil. Aqui você ajusta preferências, categorias
          personalizadas e metas de foco financeiro.
        </p>
      </div>

      {/* 1. Preferências */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 space-y-2">
        <p className="text-[12px] text-slate-200 font-medium">Preferências</p>

        <div className="flex flex-col gap-1 text-[11px] text-slate-300">
          <div className="flex items-center justify-between">
            <span>Idioma</span>
            <select
              value={preferences.language}
              onChange={(e) =>
                onUpdatePreferences({ language: e.target.value })
              }
              className="h-7 rounded-lg bg-slate-800 border border-slate-700 px-2 text-[11px] text-slate-100 outline-none"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">Inglês</option>
            </select>
          </div>

          <label className="flex items-center justify-between mt-1">
            <span>Notificações de lembrete</span>
            <input
              type="checkbox"
              checked={preferences.notifications}
              onChange={(e) =>
                onUpdatePreferences({ notifications: e.target.checked })
              }
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Modo foco</span>
            <input
              type="checkbox"
              checked={preferences.focusMode}
              onChange={(e) =>
                onUpdatePreferences({ focusMode: e.target.checked })
              }
            />
          </label>

          <label className="flex items-center justify-between opacity-60">
            <span>Tema escuro</span>
            <input type="checkbox" checked={preferences.darkMode} readOnly />
          </label>
        </div>
      </div>

      {/* 2. Categorias personalizadas */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-slate-200 font-medium">
            Categorias personalizadas
          </p>
          <span className="text-[10px] text-slate-500">
            {categories.length} categorias
          </span>
        </div>

        {/* lista de categorias */}
        <div className="flex flex-wrap gap-1 text-[11px]">
          {categories.map((cat) => (
            <span
              key={cat.id}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700"
            >
              {cat.name}
              <span className="text-[9px] uppercase text-slate-400">
                {cat.type === "in" ? "ENTRADA" : "SAÍDA"}
              </span>
              <button
                type="button"
                onClick={() => onRemoveCategory(cat.id)}
                className="text-[10px] text-slate-400 hover:text-rose-400"
              >
                ✕
              </button>
            </span>
          ))}
          {categories.length === 0 && (
            <span className="text-[11px] text-slate-500">
              Nenhuma categoria cadastrada.
            </span>
          )}
        </div>

        {/* formulário nova categoria */}
        <form
          onSubmit={handleAddCategorySubmit}
          className="mt-2 flex flex-col gap-1 text-[11px]"
        >
          <div className="flex gap-2">
            <input
              className="flex-1 h-8 rounded-lg bg-slate-800 border border-slate-700 px-2 text-xs text-slate-100 outline-none"
              placeholder="Nome da categoria (ex.: Investimentos)"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <select
              value={newCategoryType}
              onChange={(e) =>
                setNewCategoryType(e.target.value === "in" ? "in" : "out")
              }
              className="w-24 h-8 rounded-lg bg-slate-800 border border-slate-700 px-1 text-[11px] text-slate-100 outline-none"
            >
              <option value="out">Saída</option>
              <option value="in">Entrada</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-1 self-end px-3 py-1 rounded-lg bg-emerald-400 text-slate-900 text-[11px] font-semibold"
          >
            Adicionar
          </button>
        </form>
      </div>

      {/* 3. Metas de foco financeiro */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-slate-200 font-medium">
            Metas de foco financeiro
          </p>
          <span className="text-[10px] text-slate-500">
            {focusGoals.length} metas
          </span>
        </div>

        {/* Lista de metas */}
        <div className="space-y-1 max-h-40 overflow-y-auto scroll-area pr-1">
          {focusGoals.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              Nenhuma meta de foco cadastrada.
            </p>
          ) : (
            focusGoals.map((g) => (
              <div
                key={g.id}
                className="flex items-center justify-between rounded-xl bg-slate-800/70 border border-slate-700 px-2 py-1.5"
              >
                <div className="flex flex-col">
                  <span className="text-[12px] text-slate-100">
                    {g.name}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Categoria: {g.category}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[11px] text-emerald-300 font-semibold">
                    Limite {formatCurrencyBRL(g.limit)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveFocusGoal(g.id)}
                    className="text-[10px] text-slate-400 hover:text-rose-400"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Form nova meta de foco */}
        <form
          onSubmit={handleAddFocusGoalSubmit}
          className="mt-2 flex flex-col gap-1 text-[11px]"
        >
          <input
            className="h-8 rounded-lg bg-slate-800 border border-slate-700 px-2 text-xs text-slate-100 outline-none"
            placeholder="Nome da meta (ex.: Reduzir gastos com Lazer)"
            value={focusName}
            onChange={(e) => setFocusName(e.target.value)}
          />
          <input
            className="h-8 rounded-lg bg-slate-800 border border-slate-700 px-2 text-xs text-slate-100 outline-none"
            placeholder="Categoria alvo (ex.: Lazer)"
            value={focusCategory}
            onChange={(e) => setFocusCategory(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <input
              className="flex-1 h-8 rounded-lg bg-slate-800 border border-slate-700 px-2 text-xs text-slate-100 outline-none"
              placeholder="Limite mensal (R$)"
              value={focusLimitText}
              onChange={(e) => setFocusLimitText(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 py-1 rounded-lg bg-emerald-400 text-slate-900 text-[11px] font-semibold"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
