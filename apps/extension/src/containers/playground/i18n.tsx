import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
	.use(Backend)
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		lng: 'en',
		backend: {
			/* translation file path */
			// loadPath: '/locales/{{lng}}.json',
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},
		fallbackLng: 'en',
		debug: false,
		keySeparator: false,
		react: {
			useSuspense: false,
		},
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
			formatSeparator: ',',
		},
	})

export default i18n
