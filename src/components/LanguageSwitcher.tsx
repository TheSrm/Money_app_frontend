import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

export const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();

    const languages = [
        { code: "es", flag: "🇪🇸", label: t("languages.es") },
        { code: "en", flag: "🇬🇧", label: t("languages.en") }
    ];

    const currentLang = languages.find(l => l.code === i18n.resolvedLanguage);

    return (
        <div className="relative inline-block group">
            <button
                className="flex items-center gap-2 px-2.5 py-1.5 text-sm font-medium
                           text-foreground hover:text-primary transition-colors duration-150"
            >
                <span className="text-base">{currentLang?.flag}</span>
            </button>

            <div className="absolute right-0 bottom-full mb-2 w-44 bg-background rounded-lg shadow-xl
                          border border-border opacity-0 invisible group-hover:opacity-100
                          group-hover:visible transition-all duration-200 py-2 z-50
                          group-hover:-translate-y-1">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => i18n.changeLanguage(lang.code)}
                        className={`w-full px-4 py-2.5 flex items-center gap-3 text-sm
                                   transition-colors duration-150
                                   ${i18n.resolvedLanguage === lang.code
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-foreground hover:bg-accent'}`}
                    >
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.label}</span>
                        {i18n.resolvedLanguage === lang.code && (
                            <Check className="ml-auto w-4 h-4" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};