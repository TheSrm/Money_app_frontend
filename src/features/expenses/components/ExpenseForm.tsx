// features/expenses/components/ExpenseForm.tsx
import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';

import { Expense, User } from '../types';
import {expenseService} from "../intex";

interface ExpenseFormData {
    googleId: string;
    amount: string;
    concept: string;
    date: string;
    isPeriodical: boolean;
}

interface ExpenseFormProps {
    user: User | null;
    onExpenseCreated?: (expense: Expense) => void;
    onCancel: () => void;
    editExpense?: Expense | null;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ user, onExpenseCreated, onCancel, editExpense }) => {
    const [formData, setFormData] = useState<ExpenseFormData>({
        googleId: '',
        amount: '',
        concept: '',
        date: new Date().toISOString().split('T')[0],
        isPeriodical: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cuando el componente se monta o cambia user, actualizar googleId
    useEffect(() => {
        if (user && user.googleId) {
            setFormData(prev => ({
                ...prev,
                googleId: user.googleId,
            }));
        } else {
            setError('⚠️ Error: No se encontró el ID de usuario. Por favor, vuelve a iniciar sesión.');
        }
    }, [user]);

    // Si hay un gasto para editar, cargar sus datos
    useEffect(() => {
        if (editExpense) {
            setFormData({
                googleId: user?.googleId || '',
                amount: editExpense.amount.toString(),
                concept: editExpense.concept,
                date: editExpense.date,
                isPeriodical: editExpense.isPeriodical || false,
            });
        }
    }, [editExpense, user]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validación estricta
        if (!formData.googleId) {
            setError('❌ Error: No se encontró el ID de usuario. Por favor, cierra sesión y vuelve a entrar.');
            setLoading(false);
            return;
        }

        if (!formData.concept || formData.concept.trim() === '') {
            setError('❌ Por favor, ingresa un concepto');
            setLoading(false);
            return;
        }

        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            setError('❌ Por favor, ingresa una cantidad válida (mayor a 0)');
            setLoading(false);
            return;
        }

        try {
            const expenseData = {
                googleId: formData.googleId,
                amount: parseFloat(formData.amount),
                concept: formData.concept.trim(),
                date: formData.date,
                isPeriodical: formData.isPeriodical,
            };

            console.log('📤 Enviando gasto al backend:', expenseData);

            const newExpense = await expenseService.createExpense(expenseData);

            console.log('✅ Gasto creado:', newExpense);

            onExpenseCreated?.(newExpense);

            // Resetear formulario
            setFormData({
                googleId: user?.googleId || '',
                amount: '',
                concept: '',
                date: new Date().toISOString().split('T')[0],
                isPeriodical: false,
            });
        } catch (err) {
            console.error('❌ Error al crear gasto:', err);
            const message = err instanceof Error ? err.message : 'Error al crear el gasto';
            setError(`❌ ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <h2 className="text-xl font-bold mb-4">
                {editExpense ? '✏️ Editar Gasto' : '➕ Nuevo Gasto'}
            </h2>

            {error && (
                <div className="text-red-600 mb-4 p-2.5 bg-red-50 rounded border border-red-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="concept" className="block mb-1.5 font-bold">
                        Concepto *
                    </label>
                    <input
                        type="text"
                        id="concept"
                        name="concept"
                        value={formData.concept}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Supermercado, Gasolina, etc."
                        className="w-full p-2.5 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="amount" className="block mb-1.5 font-bold">
                        Cantidad (€) *
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full p-2.5 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block mb-1.5 font-bold">
                        Fecha *
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full p-2.5 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                <div className="mb-5">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isPeriodical"
                            checked={formData.isPeriodical}
                            onChange={handleChange}
                            className="w-4 h-4"
                        />
                        Gasto periódico
                    </label>
                </div>

                <div className="flex gap-2.5">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-5 py-2.5 text-white border-none rounded font-bold transition-colors ${
                            loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600 cursor-pointer'
                        }`}
                    >
                        {loading ? 'Guardando...' : editExpense ? 'Actualizar Gasto' : 'Guardar Gasto'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;