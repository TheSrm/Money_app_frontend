import axios from "axios";
import { API_URL } from "../../../config/api";
import { User } from "../../expenses/types";


export const authService = {

    loginWithGoogle: async (idToken: string) => {

        const { data } = await axios.post(
            `${API_URL}/api/auth/google`,
            {
                idToken
            }
        );

        if (!data.googleId) {
            throw new Error(
                "El servidor no devolvió googleId"
            );
        }

        const user: User = {
            googleId: data.googleId,
            email: data.email,
            name: data.name,
            createdAt: data.createdAt,
        };

        return {
            user,
            token: data.token
        };
    },


    saveSession: (
        user: User,
        token: string
    ) => {

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        localStorage.setItem(
            "token",
            token
        );
    },


    getStoredUser: (): User | null => {
        const savedUser =
            localStorage.getItem("user");

        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser) as User;

        } catch {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return null;
        }
    },

    logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

};