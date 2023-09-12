import i18n, { type Resource } from 'i18next'
import React from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'

export interface IProps {
	resources: Resource
	children: React.ReactElement
}

const I18 = ({ children, resources }: IProps) => {
	i18n.use(initReactI18next).init({
		resources,
		lng: 'enUS',
		fallbackLng: 'enUS',
		debug: true,
		nsSeparator: '.',
	})

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export default I18
