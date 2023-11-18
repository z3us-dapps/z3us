import React, { type PropsWithChildren, createContext, useEffect } from 'react'
import browser from 'webextension-polyfill'

import { MessageClient } from '@src/browser/ledger/message-client'

const client = MessageClient()

export const ClientContext = createContext<typeof client>(client)

export const ClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
	useEffect(() => {
		browser.runtime.onMessage.addListener(client.onMessage)
		return () => browser.runtime.onMessage.removeListener(client.onMessage)
	}, [])

	return <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
}
