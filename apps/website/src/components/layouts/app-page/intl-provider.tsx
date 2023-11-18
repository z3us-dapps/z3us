import React, { type PropsWithChildren, useEffect } from 'react'
import { IntlProvider } from 'react-intl'

import { getDirection } from 'ui/src/constants/intl'
import { MessagesProvider } from 'ui/src/context/messages-provider'
import { TextDirectionProvider } from 'ui/src/context/text-direction-provider'
import { useLocale } from 'ui/src/hooks/use-locale'
import { useMessages } from 'ui/src/hooks/use-messages'
import { useTextDirection } from 'ui/src/hooks/use-text-direction'
import { DEFAULT_LOCALE } from 'ui/src/store/intl'
import type { LOCALE } from 'ui/src/store/types'

async function loadTranslation(locale: LOCALE): Promise<unknown> {
	switch (locale) {
		case 'en':
			return import('./locales/en.json')
		case 'zh':
			return import('./locales/zh.json')
		case 'es':
			return import('./locales/es.json')
		case 'ru':
			return import('./locales/ru.json')
		case 'ar':
			return import('./locales/ar.json')
		case 'pt':
			return import('./locales/pt.json')
		case 'fr':
			return import('./locales/fr.json')
		case 'de':
			return import('./locales/de.json')
		case 'it':
			return import('./locales/it.json')
		case 'pl':
			return import('./locales/pl.json')
		case 'jp':
			return import('./locales/jp.json')
		default:
			return import('./locales/en.json')
	}
}

const LanguageProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const locale = useLocale()
	const [messages, setMessages] = useMessages()
	const [, setDirection] = useTextDirection()

	useEffect(() => {
		loadTranslation(locale).then((result: any) => setMessages(result?.default || result))
		setDirection(getDirection(locale))
	}, [locale, setMessages])

	return (
		<IntlProvider locale={locale} messages={messages} defaultLocale={DEFAULT_LOCALE}>
			<>{React.Children.only(children)}</>
		</IntlProvider>
	)
}

const Intl: React.FC<PropsWithChildren> = ({ children }) => (
	<TextDirectionProvider>
		<MessagesProvider>
			<LanguageProvider>{React.Children.only(children)}</LanguageProvider>
		</MessagesProvider>
	</TextDirectionProvider>
)

export default Intl
