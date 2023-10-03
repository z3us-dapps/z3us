import React, { type PropsWithChildren, createContext } from 'react'

import { MessageClient } from '@src/browser/ledger/message-client'

const client = MessageClient()

export const ClientContext = createContext<typeof client>(client)

export const ClientProvider: React.FC<PropsWithChildren> = ({ children }) => (
	<ClientContext.Provider value={client}>{children}</ClientContext.Provider>
)
