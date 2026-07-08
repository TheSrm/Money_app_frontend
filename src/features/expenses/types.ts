

export interface Expense {
    id: string;
    googleId: string;
    amount: number;
    concept: string;
    date: string;
    isPeriodical: boolean;
    isCanceled?: boolean;
}


export type CreateExpenseDTO = Omit<Expense, 'id' | 'isCanceled'>;

export type UpdateExpenseDTO = Partial<Omit<Expense, 'id'>> & { id: string };

export interface ExpenseFilter {
    year: string | null;
    month: string | null;
}

export interface User {
    googleId: string;
    email: string;
    name: string;
    createdAt: string;


}