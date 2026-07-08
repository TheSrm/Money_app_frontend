import { GoogleLoginButton } from "../features/auth/components/GoogleLoginButton";
import { useAuth } from "../features/auth/context/AuthContext";

export const LoginPage = () => {

    const { login } = useAuth();

    return (
        <div className="login-container">
            <h1>Money App</h1>

            <p>
                Gestiona tus gastos de manera fácil y rápida
            </p>

            <GoogleLoginButton
                onLoginSuccess={login}
            />
        </div>
    );
};