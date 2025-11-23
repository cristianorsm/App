import React, { useState } from "react";
import { Screen, Transaction } from "./types";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import PlanningScreen from "./screens/PlanningScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BottomNav from "./components/BottomNav";

// Fake data for prototype
const initialTransactions: Transaction[] = [
  { id: 1, date: "2025-11-22", label: "Mercado", category: "Essencial", amount: 220, type: "out" },
  { id: 2, date: "2025-11-22", label: "Salário", category: "Renda fixa", amount: 4800, type: "in" },
  { id: 3, date: "2025-11-22", label: "Streaming", category: "Assinaturas", amount: 39.9, type: "out" },
  { id: 4, date: "2025-11-21", label: "Academia", category: "Saúde", amount: 99.9, type: "out" },
  { id: 5, date: "2025-11-21", label: "Delivery", category: "Lazer", amount: 45, type: "out" },
  { id: 6, date: "2025-11-21", label: "Transporte", category: "Mobilidade", amount: 25, type: "out" },
  { id: 7, date: "2025-11-10", label: "Aluguel", category: "Moradia", amount: 2000, type: "out" },
  { id: 8, date: "2025-11-08", label: "Conta de luz", category: "Serviços", amount: 20.2, type: "out" },
  { id: 9, date: "2025-11-15", label: "Freelancer", category: "Renda extra", amount: 1400, type: "in" },
];

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("login");
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const [nextScreen, setNextScreen] = useState<Screen | null>(null);
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const TRANSITION_MS = 320;

  const monthlyGoal = 4000;

  // Determine current date from transactions (use the latest transaction date)
  const latestDate =
    transactions
      .map((t) => t.date)
      .sort()
      .reverse()[0] || new Date().toISOString().slice(0, 10);

  const currentDate = latestDate; // yyyy-mm-dd

  // Format label in Portuguese: Hoje, 22 de novembro
  const monthNames = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const [y, m, d] = currentDate.split("-");
  const dayNum = String(Number(d));
  const monthLabel = monthNames[Number(m) - 1] || "";
  const currentDateLabel = `Hoje, ${dayNum} de ${monthLabel}`;

  // ➕ adiciona uma nova ENTRADA
  function handleAddIncome(data: { label: string; category: string; amount: number }) {
    setTransactions((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((t) => t.id)) + 1 : 1;
      const newTx: Transaction = {
        id: nextId,
        date: currentDate,
        label: data.label,
        category: data.category,
        amount: data.amount,
        type: "in",
      };
      return [...prev, newTx];
    });
  }

  function requestScreenChange(target: Screen) {
    if (target === screen || isTransitioning) {
      setScreen(target);
      return;
    }

    setPrevScreen(screen);
    setNextScreen(target);
    setIsTransitioning(true);

    setTimeout(() => {
      setScreen(target);
      setPrevScreen(null);
      setNextScreen(null);
      setIsTransitioning(false);
    }, TRANSITION_MS);
  }

  const renderScreen = (s: Screen) => {
    switch (s) {
      case "login":
        return <LoginScreen onEnter={() => requestScreenChange("home")} />;
      case "home":
        return (
          <HomeScreen
            goTransactions={() => requestScreenChange("transactions")}
            goPlanning={() => requestScreenChange("planning")}
            transactions={transactions}
            monthlyGoal={monthlyGoal}
            currentDate={currentDate}
            currentDateLabel={currentDateLabel}
            onAddIncome={handleAddIncome}
          />
        );
      case "transactions":
        return (
          <TransactionsScreen
            transactions={transactions}
            currentDate={currentDate}
          />
        );
      case "planning":
        return <PlanningScreen />;
      case "profile":
        return <ProfileScreen />;
    }
  };

  const AnimatedLayer: React.FC<{ mode: "enter" | "exit" }> = ({ mode, children }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      const el = ref.current;
      if (!el) return;

      if (mode === "enter") {
        el.classList.add("opacity-0", "translate-y-2");
        requestAnimationFrame(() => {
          el.classList.remove("opacity-0", "translate-y-2");
          el.classList.add(
            "opacity-100",
            "translate-y-0",
            "transition-all",
            "duration-300",
            "ease-out"
          );
        });
      } else {
        el.classList.add("opacity-100", "translate-y-0");
        requestAnimationFrame(() => {
          el.classList.add("transition-all", "duration-300", "ease-in");
          el.classList.add("opacity-0", "-translate-y-2");
        });
      }
    }, [mode]);

    return (
      <div ref={ref} className="absolute inset-0">
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center">
      {/* Moldura do “celular” */}
      <div className="w-[390px] h-[780px] bg-slate-950 rounded-[40px] border border-slate-800 shadow-2xl flex flex-col">
        {/* Barra de status fake */}
        <div className="h-10 flex items-center justify-between px-5 text-[11px] text-slate-300">
          <span>09:41</span>
          <div className="flex gap-1 items-center text-[10px]">
            <span>LTE</span>
            <span>▮▮▮▮</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Área principal com as telas + animação */}
        <div className="flex-1 bg-slate-900 rounded-t-[32px] pt-4 px-4 flex flex-col relative">
          {isTransitioning && prevScreen && nextScreen ? (
            <>
              <AnimatedLayer mode="exit">{renderScreen(prevScreen)}</AnimatedLayer>
              <AnimatedLayer mode="enter">{renderScreen(nextScreen)}</AnimatedLayer>
            </>
          ) : (
            <div className="relative min-h-[60vh]">{renderScreen(screen)}</div>
          )}
        </div>

        {/* Bottom nav dentro da moldura */}
        <BottomNav current={screen} onChange={(s) => requestScreenChange(s)} />
      </div>
    </div>
  );
};

export default App;
