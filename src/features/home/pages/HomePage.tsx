import ExpenseList from "../../expenses/components/ExpenseComponent"
import { User } from "../../expenses/types";
import { useAuth } from "../../auth/context/AuthContext";

interface HomePageProps {

    user: User;
    onLogout: () => void;

}


export const HomePage = ({
                             user,
                             onLogout
                         }: HomePageProps) => {


    return (

        <div className="min-h-screen bg-gray-50 p-5">

            <header className="bg-white rounded-lg shadow p-5 mb-6 flex justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Hola {user.name}
                    </h1>

                    <p className="text-gray-500">
                        {user.email}
                    </p>
                </div>


                <button
                    onClick={onLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Salir
                </button>
            </header>

            <main>
                <ExpenseList user={user}/>
            </main>
            Cre
        </div>

    );
};