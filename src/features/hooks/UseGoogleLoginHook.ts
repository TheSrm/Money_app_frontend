import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../config/api";
import { User } from "../expenses/types";
import { useTranslation } from "react-i18next";

interface UseGoogleAuthOptions {
    onLoginSuccess: (user: User, token: string) => void;
}

export const useGoogleAuth = ({ onLoginSuccess }: UseGoogleAuthOptions) => {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const handleSuccess = async (response: any) => {
        setLoading(true);

        try {
            const { data } = await axios.post(`${API_URL}/api/auth/google`, {
                idToken: response.credential,
            });

            if (!data.googleId) {
                throw new Error(
                    t("auth.errors.noGoogleId", "The server did not return googleId")
                );
            }

            const userData: User = {
                googleId: data.googleId,
                email: data.email,
                name: data.name,
                createdAt: data.createdAt,
            };

            onLoginSuccess(userData, data.token);
        } catch (error) {
            console.error("Error en login:", error);
            alert(t("auth.errors.loginFailed", "Error logging in. Please try again."));
        } finally {
            setLoading(false);
        }
    };

    const handleError = () => {
        console.error("Login con Google falló");
        alert(t("auth.errors.googleLoginFailed", "Error logging in. Please try again."));
    };

    const login = useGoogleLogin({
        onSuccess: handleSuccess,
        onError: handleError,
        flow: "implicit",
    });

    return { login, loading };
};