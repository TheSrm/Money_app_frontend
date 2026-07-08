// features/expenses/services/expenseService.ts
import { Expense, CreateExpenseDTO, UpdateExpenseDTO } from '../types'

const BASE_URL = '/api/expenses';

async function handleResponse<T>(response: Response): Promise<T> {
    // Log para debugging
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.get('content-type'));

    if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
            const body = await response.json();
            errorMessage = body?.message || errorMessage;
        } catch (e) {
            // Si no es JSON, usar el mensaje por defecto
        }
        throw new Error(errorMessage);
    }

    return response.json();
}

export const expenseService = {
    getExpenses: async (
        googleId: string,
        year?: string | null,
        month?: string | null
    ): Promise<Expense[]> => {
        try {
            const params = new URLSearchParams();
            params.append('googleId', googleId);

            // Convertir a número SOLO si existen y no están vacíos
            if (year && year !== '' && year !== 'null') {
                const yearNum = parseInt(year, 10);
                if (!isNaN(yearNum)) {
                    params.append('year', String(yearNum));
                }
            }

            if (month && month !== '' && month !== 'null') {
                const monthNum = parseInt(month, 10);
                if (!isNaN(monthNum)) {
                    params.append('month', String(monthNum));
                }
            }

            const url = `${BASE_URL}?${params.toString()}`;
            console.log('Fetching expenses from:', url);

            const response = await fetch(url);
            const data = await handleResponse<Expense[]>(response);

            console.log('Expenses loaded:', data);
            return data;
        } catch (error) {
            console.error('Error in getExpenses:', error);
            throw error;
        }
    },

    createExpense: async (data: CreateExpenseDTO): Promise<Expense> => {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return handleResponse<Expense>(response);
        } catch (error) {
            console.error('Error in createExpense:', error);
            throw error;
        }
    },

    updateExpense: async (data: UpdateExpenseDTO): Promise<Expense> => {
        try {
            const response = await fetch(`${BASE_URL}/${data.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return handleResponse<Expense>(response);
        } catch (error) {
            console.error('Error in updateExpense:', error);
            throw error;
        }
    },

    deleteExpense: async (id: string, googleId: string): Promise<void> => {
        try {
            const response = await fetch(`${BASE_URL}/${id}?googleId=${googleId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                let errorMessage = `Error ${response.status}: ${response.statusText}`;
                try {
                    const body = await response.json();
                    errorMessage = body?.message || errorMessage;
                } catch (e) {
                    // Si no es JSON, usar el mensaje por defecto
                }
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error in deleteExpense:', error);
            throw error;
        }
    },
};