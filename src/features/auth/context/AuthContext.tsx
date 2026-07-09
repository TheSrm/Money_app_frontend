import {createContext, useContext, useEffect, useState, ReactNode} from "react";
import {AuthContextType, User} from "../../expenses/types";
import { authService } from "../services/authService";



const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);


interface AuthProviderProps {
    children: ReactNode;
}


export const AuthProvider = ({children}: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        const savedUser = authService.getStoredUser();

        if (savedUser) {
            setUser(savedUser);
        }

    }, []);

    const login = (
        user: User,
        token: string
    ) => {

        authService.saveSession(
            user,
            token
        );

        setUser(user);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };



    return (<AuthContext.Provider value={{user, login, logout}}>
    {children}
    </AuthContext.Provider>);

};



export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }

    return context;
};