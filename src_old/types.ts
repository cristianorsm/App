export type Screen = "login" | "home" | "transactions" | "planning" | "profile";

export type TransactionKind = "in" | "out";

export interface Transaction {
	id: number;
	date: string; // yyyy-mm-dd
	label: string;
	category: string;
	amount: number;
	type: TransactionKind;
}

