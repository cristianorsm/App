export type Screen = "login" | "home" | "transactions" | "planning" | "profile";

export interface Transaction {
  id: number;
  date: string; // yyyy-mm-dd
  label: string;
  category: string;
  amount: number;
  type: "in" | "out";
}

// Metas da aba Planejar
export interface Goal {
  id: number;
  name: string;
  amount: number;
}

// Preferências gerais do usuário
export interface Preferences {
  language: string;      // ex.: "pt-BR"
  darkMode: boolean;     // tema escuro ligado
  notifications: boolean; // lembretes
  focusMode: boolean;     // modo foco ligado
}

// Categorias personalizadas
export interface CustomCategory {
  id: number;
  name: string;
  type: "in" | "out"; // entrada ou saída
}

// Metas de foco financeiro (aba Perfil)
export interface FocusGoal {
  id: number;
  name: string;      // nome da meta, ex.: "Reduzir Lazer"
  category: string;  // categoria alvo, ex.: "Lazer"
  limit: number;     // limite de gasto em R$
}
