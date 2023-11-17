import React, { type PropsWithChildren, createContext, useEffect, useState } from 'react'
import browser from 'webextension-polyfill'

import { useSharedStore } from 'ui/src/hooks/use-store'
import type { Keystore } from 'ui/src/store/types'

import { MessageClient } from '@src/browser/app/message-client'
import { MessageAction as InPageMessageAction } from '@src/browser/inpage/types'
import { eventFromMessage, newMessage } from '@src/browser/messages/message'
import { MessageSource } from '@src/browser/messages/types'

const client = MessageClient()

export const ClientContext = createContext<typeof client>(client)

export const ClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const [current, setCurrent] = useState<Keystore>()

	useEffect(() => {
		browser.runtime.onMessage.addListener(client.onMessage)
		return () => browser.runtime.onMessage.removeListener(client.onMessage)
	}, [])

	useEffect(() => {
		if (current && current.id !== keystore?.id) {
			const msg = newMessage(
				InPageMessageAction.INPAGE_KEYSTORE_CHANGE,
				MessageSource.POPUP,
				MessageSource.INPAGE,
				keystore,
			)
			window.dispatchEvent(eventFromMessage(msg))
			browser.tabs.query({}).then(tabs => tabs.map(tab => browser.tabs.sendMessage(tab.id, msg)))
		} else if (keystore) {
			setCurrent(keystore)
		}
	}, [keystore])

	return <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
}
