import i18n from 'i18next'
import React from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'

import enUS from './locales/en.json'
import pl from './locales/pl.json'

// codes: https://www.science.co.il/language/Locale-codes.php
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

export interface IProps {
	children: React.ReactElement
}

const I18 = ({ children }: IProps) => <I18nextProvider i18n={i18n}>{children}</I18nextProvider>

export default I18
