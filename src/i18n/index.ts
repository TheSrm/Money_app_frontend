import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import esCommon from "../locales/es/common.json";
import enCommon from "../locales/en/common.json";

import esLogin from "../locales/es/login.json";
import enLogin from "../locales/en/login.json";


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({

        resources: {
            es: {
                translation: {
                    ...esCommon,
                    ...esLogin,
                },
            },

            en: {
                translation: {
                    ...enCommon,
                    ...enLogin,
                },
            },
        },

        fallbackLng: "es",

        detection: {
            order: [
                "localStorage",
                "navigator"
            ],
            caches: [
                "localStorage"
            ],
        },

        interpolation: {
            escapeValue: false,
        },
    });


export default i18n;