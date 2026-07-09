import { useTranslation } from "react-i18next";
import { GoogleLoginButton } from "../features/auth/components/GoogleLoginButton";
import { useAuth } from "../features/auth/context/AuthContext";
import { LanguageSwitcher} from "../components/LanguageSwitcher";
import Header from "../features/login/LoginHeader";

export const LoginPage = () => {

    const { login } = useAuth();
    const { t } = useTranslation();

    return (
        <div className="login-container">
            <Header />
            <h1>{t("app.title")}</h1>

            <p>
                {t("app.subtitle")}
            </p>

            <GoogleLoginButton
                onLoginSuccess={login}
            />
        </div>
    );
};