import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// codes: https://www.science.co.il/language/Locale-codes.php
import enUS from './trans/en-US.json'
import pl from './trans/pl.json'

const resources = {
	enUS: {
		translation: enUS,
	},
	pl: {
		translation: pl,
	},
}

i18n.use(initReactI18next).init({
	resources,
	lng: 'enUS',
	fallbackLng: 'enUS',
	debug: true,
	nsSeparator: '.',
})

export default i18n
