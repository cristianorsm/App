import React from "react";

interface ProfileRowProps {
  label: string;
  value: string;
}

const ProfileRow: React.FC<ProfileRowProps> = ({ label, value }) => {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 px-3 py-2.5 flex justify-between items-center">
      <div>
        <p className="text-xs text-slate-50">{label}</p>
        <p className="text-[10px] text-slate-400">{value}</p>
      </div>
      <span className="text-[11px] text-slate-500">›</span>
    </div>
  );
};

export default ProfileRow;
