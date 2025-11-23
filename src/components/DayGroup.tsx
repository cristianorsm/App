import React from "react";

interface DayGroupProps {
  date: string;
  children: React.ReactNode;
}

const DayGroup: React.FC<DayGroupProps> = ({ date, children }) => {
  return (
    <div className="space-y-1">
      <p className="text-[11px] text-slate-400 mb-1">{date}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

export default DayGroup;
