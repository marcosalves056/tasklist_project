import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '../assets/languages/en/translationEN.json'
import translationES from '../assets/languages/es/translationES.json'
import translationPT_BR from '../assets/languages/pt-br/translationPT_BR.json'

const resources = {
  'en': {
    translation: translationEN
  },
  'es':{
    translation: translationES
  },
  'pt-BR': {
    translation: translationPT_BR
  }
};


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language,
    debug: false,

  
    //whitelist: availableLanguages,
    //interpolation: {
    //  escapeValue: false
    //}
  });

export default i18n;
