import { getDirection } from 'packages/ui/src/constants/intl'
import React, { type PropsWithChildren, useEffect } from 'react'
import { IntlProvider } from 'react-intl'

import { MessagesProvider } from 'ui/src/context/messages-provider'
import { TextDirectionProvider } from 'ui/src/context/text-direction-provider'
import { useLocale } from 'ui/src/hooks/use-locale'
import { useMessages } from 'ui/src/hooks/use-messages'
import { useTextDirection } from 'ui/src/hooks/use-text-direction'
import { DEFAULT_LOCALE } from 'ui/src/store/intl'
import type { LOCALE } from 'ui/src/store/types'

async function loadTranslation(locale: LOCALE) {
	switch (locale) {
		case 'en':
			return import('@src/locales/en.json')
		case 'zh':
			return import('@src/locales/zh.json')
		case 'es':
			return import('@src/locales/es.json')
		case 'hi':
			return import('@src/locales/hi.json')
		case 'ru':
			return import('@src/locales/ru.json')
		case 'ar':
			return import('@src/locales/ar.json')
		case 'pt':
			return import('@src/locales/pt.json')
		case 'ms':
			return import('@src/locales/ms.json')
		case 'fr':
			return import('@src/locales/fr.json')
		case 'de':
			return import('@src/locales/de.json')
		case 'it':
			return import('@src/locales/it.json')
		case 'pl':
			return import('@src/locales/pl.json')
		case 'jp':
			return import('@src/locales/jp.json')
		default:
			return import('@src/locales/en.json')
	}
}

const LanguageProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const locale = useLocale()
	const [messages, setMessages] = useMessages()
	const [, setDirection] = useTextDirection()

	useEffect(() => {
		loadTranslation(locale).then(result => setMessages(result.default || result))
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
