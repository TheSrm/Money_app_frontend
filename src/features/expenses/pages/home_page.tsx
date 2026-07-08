import React from "react";
import { User } from "../types";
import ExpenseList from "../components/ExpenseComponent"

interface HomeProps {
    user: User;
    onLogout: () => void;
}

export const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-5">

            <header className="bg-white rounded-lg shadow-sm p-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                    <h1 className="text-2xl font-bold">
                        Hola, {user.name}
                    </h1>

                    <p className="text-gray-500">
                        Gestiona tus gastos de manera fácil y rápida
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                        {user.email}
                    </p>
                </div>

                <button
                    onClick={onLogout}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                    Cerrar sesión
                </button>

            </header>


            <main className="max-w-6xl mx-auto">

                <section className="bg-white rounded-lg shadow-sm p-5">

                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-bold">
                            Gastos
                        </h2>

                        <button
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                            + Añadir gasto
                        </button>
                    </div>


                    <ExpenseList user={user} />

                </section>

            </main>

        </div>
    );
};