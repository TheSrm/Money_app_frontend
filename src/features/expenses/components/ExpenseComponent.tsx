// features/expenses/components/ExpenseList.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Expense, ExpenseFilter, User } from '../types';
import {expenseService} from "../intex";

interface ExpenseListProps {
    user: User;
    onDelete?: (id: string) => void;
    onEdit?: (expense: Expense) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ user, onDelete, onEdit }) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<ExpenseFilter>({ year: null, month: null });

    useEffect(() => {
        loadExpenses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, filter]);

    const loadExpenses = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await expenseService.getExpenses(user.googleId, filter.year, filter.month);
            setExpenses(data);
        } catch (err) {
            setError('Error al cargar los gastos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de eliminar este gasto?')) {
            try {
                await expenseService.deleteExpense(id, user.googleId);
                setExpenses(prev => prev.filter(e => e.id !== id));
                onDelete?.(id);
            } catch (err) {
                setError('Error al eliminar el gasto');
                console.error(err);
            }
        }
    };

    const formatDate = (date: string): string => {
        return new Date(date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const formatAmount = (amount: number): string => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
        }).format(amount);
    };

    const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter({ ...filter, year: e.target.value || null });
    };

    const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter({ ...filter, month: e.target.value || null });
    };

    if (loading) return <div className="p-5 text-center text-gray-500">Cargando gastos...</div>;
    if (error) return <div className="p-2.5 text-red-600 bg-red-50 rounded border border-red-200">{error}</div>;

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <h2 className="text-xl font-bold">Mis Gastos</h2>
                <div className="flex gap-2.5">
                    <select
                        value={filter.year || ''}
                        onChange={handleYearChange}
                        className="p-2 border border-gray-300 rounded text-sm"
                    >
                        <option value="">Todos los años</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                    <select
                        value={filter.month || ''}
                        onChange={handleMonthChange}
                        className="p-2 border border-gray-300 rounded text-sm"
                    >
                        <option value="">Todos los meses</option>
                        <option value="1">Enero</option>
                        <option value="2">Febrero</option>
                        <option value="3">Marzo</option>
                        <option value="4">Abril</option>
                        <option value="5">Mayo</option>
                        <option value="6">Junio</option>
                        <option value="7">Julio</option>
                        <option value="8">Agosto</option>
                        <option value="9">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </select>
                </div>
            </div>

            {expenses.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No hay gastos registrados</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {expenses.map(expense => (
                        <div
                            key={expense.id}
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="font-bold text-base">{expense.concept}</h3>
                                <p className="text-sm text-gray-500">{formatDate(expense.date)}</p>
                                <div className="flex gap-1.5 mt-1.5">
                                    {expense.isPeriodical && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                                            Periódico
                                        </span>
                                    )}
                                    {expense.isCanceled && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                                            Cancelado
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                                <span className="font-bold text-lg">{formatAmount(expense.amount)}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEdit?.(expense)}
                                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                                        aria-label="Editar gasto"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDelete(expense.id)}
                                        className="p-1.5 rounded hover:bg-red-50 transition-colors"
                                        aria-label="Eliminar gasto"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExpenseList;