import { useAuth } from "../features/auth/context/AuthContext";
import ExpenseComponent from "../features/expenses/components/ExpenseComponent";

export const HomePage = () => {

    const { user, logout } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <header className="flex justify-between items-center mb-6">

                <div>
                    <h1 className="text-2xl font-bold">
                        Hola, {user.name}
                    </h1>

                    <p className="text-gray-500">
                        {user.email}
                    </p>
                </div>


                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Cerrar sesión
                </button>

            </header>


            <ExpenseComponent user={user} />

        </div>
    );
};