import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../../config/api";
import { User } from "../../expenses/types";

interface GoogleLoginButtonProps {
    onLoginSuccess: (user: User, token: string) => void;
}

export const GoogleLoginButton = ({
                                      onLoginSuccess,
                                  }: GoogleLoginButtonProps) => {

    const [loading, setLoading] = useState(false);

    const handleSuccess = async (response: CredentialResponse) => {
        setLoading(true);

        try {
            const { data } = await axios.post(`${API_URL}/api/auth/google`, {
                idToken: response.credential,
            });

            if (!data.googleId) {
                throw new Error("El servidor no devolvió googleId");
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
            alert("Error al iniciar sesión. Por favor, intenta nuevamente.");

        } finally {
            setLoading(false);
        }
    };


    const handleError = () => {
        console.error("Login con Google falló");
        alert("Error al iniciar sesión con Google");
    };


    if (loading) {
        return <p>Cargando...</p>;
    }


    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            theme="filled_blue"
            size="large"
            text="signin_with"
            shape="rectangular"
        />
    );
};