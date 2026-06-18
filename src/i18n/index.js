import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "./translations";

const supportedLanguages = ["ru", "ro", "en"];

const getSavedLanguage = () => {
  if (typeof localStorage === "undefined") {
    return null;
  }

  const savedLanguage = localStorage.getItem("language");
  return supportedLanguages.includes(savedLanguage) ? savedLanguage : null;
};

const getRegionalLanguage = () => {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const locales = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const locale of locales.filter(Boolean)) {
    const normalizedLocale = locale.toLowerCase();
    const [language, region] = normalizedLocale.split(/[-_]/);

    if (language === "ru" || region === "ru") {
      return "ru";
    }

    if (language === "ro" || language === "mo" || region === "md") {
      return "ro";
    }
  }

  return "en";
};

i18n.use(initReactI18next).init({
  resources: translations,
  lng: getSavedLanguage() || getRegionalLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
