import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

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
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600
                           text-white font-semibold rounded-lg shadow-lg hover:shadow-xl
                           hover:from-blue-600 hover:to-blue-700 transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
                <span className="text-lg">{currentLang?.flag}</span>
                <span>{currentLang?.label}</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>

            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl
                          border border-gray-100 opacity-0 invisible group-hover:opacity-100
                          group-hover:visible transition-all duration-200 py-2 z-50">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => i18n.changeLanguage(lang.code)}
                        className={`w-full px-4 py-3 flex items-center gap-3 text-left font-medium
                                   transition-colors duration-150 hover:bg-blue-50
                                   ${i18n.resolvedLanguage === lang.code
                            ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                            : 'text-gray-700 hover:text-blue-600'}`}
                    >
                        <span className="text-xl">{lang.flag}</span>
                        <span>{lang.label}</span>
                        {i18n.resolvedLanguage === lang.code && (
                            <span className="ml-auto text-blue-500">✓</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};