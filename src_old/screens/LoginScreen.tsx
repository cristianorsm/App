import React, { useState } from "react";

/* ===================== LOGIN ===================== */

interface LoginProps {
  onEnter: () => void;
}

const LoginScreen: React.FC<LoginProps> = ({ onEnter }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validarEmail(valor: string) {
    // validação bem simples só para protótipo
    return valor.includes("@") && valor.includes(".");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (!email || !senha) {
      setErro("Preencha e-mail e senha para continuar.");
      return;
    }

    if (!validarEmail(email)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (senha.length < 4) {
      setErro("A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    // Simulação de processo de login
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // aqui no futuro podemos validar com backend / Supabase
      onEnter(); // por enquanto, só avança para a próxima tela
    }, 600);
  }

  return (
    <div className="flex-1 flex flex-col justify-between pb-6">
      {/* Logo + título */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-slate-900 font-black text-2xl shadow-lg">
          FF
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-50 tracking-tight">
            Focus Finance
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Organização financeira pensada para quem vive na correria e precisa
            de foco, clareza e leveza na hora de cuidar do dinheiro.
          </p>
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleLogin} className="mt-4 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-300">E-mail</label>
          <div className="h-11 rounded-xl bg-slate-800/60 border border-slate-700 px-3 flex items-center text-xs text-slate-200">
            <span className="text-slate-500 mr-2">@</span>
            <input
              type="email"
              className="bg-transparent outline-none w-full text-xs text-slate-100 placeholder:text-slate-500"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-300">Senha</label>
          <div className="h-11 rounded-xl bg-slate-800/60 border border-slate-700 px-3 flex items-center justify-between text-xs text-slate-200">
            <input
              type="password"
              className="bg-transparent outline-none w-full text-xs text-slate-100 placeholder:text-slate-500"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="text-[11px] text-emerald-300"
            onClick={() =>
              setErro(
                "Funcionalidade de recuperação de senha ainda será implementada neste protótipo."
              )
            }
          >
            Esqueci minha senha
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-2 h-11 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-sm font-semibold flex items-center justify-center shadow-md active:scale-[0.98] transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {erro && (
          <div className="mt-1 text-[11px] text-rose-300 bg-rose-500/10 border border-rose-500/40 rounded-lg px-3 py-2">
            {erro}
          </div>
        )}

        <div className="flex items-center gap-2 my-2">
          <span className="flex-1 h-px bg-slate-700" />
          <span className="text-[10px] text-slate-500">ou continue com</span>
          <span className="flex-1 h-px bg-slate-700" />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 h-10 rounded-xl border border-slate-700 bg-slate-900/40 text-[11px] text-slate-200 flex items-center justify-center gap-2"
            onClick={() =>
              setErro(
                "Login social (Google) será conectado em uma próxima fase do projeto."
              )
            }
          >
            <span>🔵</span>
            <span>Google</span>
          </button>
          <button
            type="button"
            className="flex-1 h-10 rounded-xl border border-slate-700 bg-slate-900/40 text-[11px] text-slate-200 flex items-center justify-center gap-2"
            onClick={() =>
              setErro(
                "Login social (Apple) será conectado em uma próxima fase do projeto."
              )
            }
          >
            <span></span>
            <span>Apple</span>
          </button>
        </div>
      </form>

      {/* Rodapé pequeno */}
      <div className="mt-2 text-[10px] text-slate-500 text-center max-w-xs mx-auto">
        Ao continuar, você concorda com os{" "}
        <span className="text-emerald-300">Termos de Uso</span> e a{" "}
        <span className="text-emerald-300">Política de Privacidade</span>.
      </div>
    </div>
  );
};

  export default LoginScreen;
