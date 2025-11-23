import React from "react";
import ProfileRow from "../components/ProfileRow";

const ProfileScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col gap-3 pb-5">
      <div className="mt-1 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-emerald-400/20 border border-emerald-300/40 flex items-center justify-center text-sm text-emerald-300">CR</div>
        <div>
          <p className="text-sm text-slate-50 font-medium">Cristiano Mateus</p>
          <p className="text-[11px] text-slate-400">Organização focada em TDAH</p>
        </div>
      </div>

      <div className="space-y-2 mt-3">
        <ProfileRow label="Notificações" value="Lembretes diários às 09:00" />
        <ProfileRow label="Modo foco" value="Ativo em dias úteis" />
        <ProfileRow label="Tema" value="Escuro (recomendado)" />
        <ProfileRow label="Idioma" value="Português (BR)" />
      </div>

      <button className="mt-4 h-10 rounded-xl border border-rose-500/50 text-sm text-rose-300 bg-rose-500/10">Sair da conta</button>
    </div>
  );
};

export default ProfileScreen;
