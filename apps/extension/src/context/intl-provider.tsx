import React, { type PropsWithChildren, useEffect } from 'react'
import { IntlProvider } from 'react-intl'

import { MessagesProvider } from 'ui/src/context/messages-provider'
import { useLocale } from 'ui/src/hooks/use-locale'
import { useMessages } from 'ui/src/hooks/use-messages'
import { DEFAULT_LOCALE } from 'ui/src/store/intl'
import { LOCALE } from 'ui/src/store/types'

async function loadTranslation(locale: LOCALE) {
	const l = LOCALE[locale]
	switch (l) {
		case LOCALE.pl:
			return import('@src/locales/compiled/pl.json')
		default:
			return import('@src/locales/compiled/en.json')
	}
}

const LanguageProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const locale = useLocale()
	const [messages, setMessages] = useMessages()

	useEffect(() => {
		loadTranslation(locale).then(result => {
			setMessages(result.default)
		})
	}, [locale, setMessages])

	return (
		<IntlProvider locale={locale} messages={messages} defaultLocale={DEFAULT_LOCALE}>
			{React.Children.only(children)}
		</IntlProvider>
	)
}

const Intl: React.FC<PropsWithChildren> = ({ children }) => (
	<MessagesProvider>
		<LanguageProvider>{React.Children.only(children)}</LanguageProvider>
	</MessagesProvider>
)

export default Intl
