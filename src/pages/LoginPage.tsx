import { useTranslation } from "react-i18next"
import { useAuth } from "../features/auth/context/AuthContext";
import Header from "../features/login/LoginHeader";
import { GoogleAuthButton } from "../features/auth/components/GoogleLoginButton";
import Footer from "../components/Footer";
import {useGoogleAuth} from "../features/hooks/UseGoogleLoginHook";

export const LoginPage = () => {
    const { login } = useAuth();
    const { t } = useTranslation();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1 flex items-center justify-center px-6">
                <div className="w-full max-w-md">
                    <GoogleAuthButton
                        label={t("auth.signInWithGoogle", "Sign in with Google")}
                        onLoginSuccess={login}
                        variant="google"
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};