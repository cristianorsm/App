import React, { useState } from "react";

interface LoginScreenProps {
  onEnter: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onEnter }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Informe e-mail e senha para continuar.");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onEnter();
    }, 700);
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-semibold text-slate-50 mb-1">
          FOCUS FINANCE
        </h1>
        <p className="text-[11px] text-slate-400">
          Controle simples para mente focada.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3"
      >
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-300">E-mail</label>
          <input
            type="email"
            className="h-9 rounded-lg bg-slate-800 border border-slate-700 px-2 text-xs text-slate-100 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@exemplo.com"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-300">Senha</label>
          <input
            type="password"
            className="h-9 rounded-lg bg-slate-800 border border-slate-700 px-2 text-xs text-slate-100 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>
        {error && (
          <p className="text-[11px] text-rose-400">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-9 rounded-lg bg-emerald-400 text-slate-900 text-xs font-semibold mt-1 disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
