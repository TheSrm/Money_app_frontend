import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background  ">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Logo y descripción */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground text-sm font-bold">F</span>
                        </div>
                        <span className="text-lg font-semibold text-foreground">Fina</span>
                    </div>

                    {/* Centro - Links */}
                    <nav className="flex items-center gap-6">
                        <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {t("footer.about", "About")}
                        </a>
                        <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {t("footer.privacy", "Privacy")}
                        </a>
                        <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {t("footer.terms", "Terms")}
                        </a>
                    </nav>

                    {/* Derecha - Language Switcher */}
                    <LanguageSwitcher />
                </div>

                {/* Copyright
                <div className="border-t border-border mt-8 pt-8">
                    <p className="text-center text-sm text-muted-foreground">
                        © {currentYear} Fina. {t("footer.allRightsReserved", "All rights reserved")}
                    </p>
                </div>*/}

            </div>
        </footer>
    );
}