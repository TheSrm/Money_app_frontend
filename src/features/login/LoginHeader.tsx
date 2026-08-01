import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { GoogleAuthButton } from "../auth/components/GoogleLoginButton"
import { User } from "../expenses/types";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { t } = useTranslation();

    const handleLoginSuccess = (user: User, token: string) => {
        console.log("Usuario logueado:", user);
    };

    const navItems = [
        { key: "features", label: t("header.features") },
        { key: "howItWorks", label: t("header.howItWorks") },
        { key: "security", label: t("header.security") }
    ];

    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* ──── Logo ──── */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-primary-foreground text-sm font-bold">F</span>
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-foreground">Fina</span>
                </div>

                {/* ──── Navigation Desktop ──── */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.key}
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* ──── CTA Buttons Desktop ──── */}
                <div className="hidden md:flex items-center gap-4">
                    <GoogleAuthButton
                        label={t("header.signIn")}
                        onLoginSuccess={handleLoginSuccess}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                        style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                        }}
                    />
                    <GoogleAuthButton
                        label={t("header.getStarted")}
                        onLoginSuccess={handleLoginSuccess}
                        className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-150"
                    />
                </div>

                {/* ──── Hamburger Menu Mobile ──── */}
                <button
                    className="md:hidden p-1 text-muted-foreground hover:text-foreground transition-colors duration-150"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* ──── Mobile Menu ──── */}
            {menuOpen && (
                <div className="md:hidden border-t border-border bg-background px-6 py-5 space-y-4">
                    {navItems.map((item) => (
                        <a
                            key={item.key}
                            href="#"
                            className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 py-1"
                        >
                            {item.label}
                        </a>
                    ))}
                    <GoogleAuthButton
                        label={t("header.getStarted")}
                        onLoginSuccess={handleLoginSuccess}
                        className="w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-150"
                    />
                </div>
            )}
        </header>
    );
}