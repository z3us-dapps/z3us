import { useSharedStore } from 'packages/ui/src/hooks/use-store'
import { Keystore } from 'packages/ui/src/store/types'
import React, { type PropsWithChildren, createContext, useEffect, useState } from 'react'

import { MessageClient } from '@src/browser/app/message-client'
import { MessageAction as InpageMessageAction, Z3USEvent } from '@src/browser/inpage/types'

const client = MessageClient()

export const ClientContext = createContext<typeof client>(client)

export const ClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const [current, setCurrent] = useState<Keystore>()

	useEffect(() => {
		if (current && current.id !== keystore?.id) {
			window.dispatchEvent(
				new CustomEvent(`z3us.${InpageMessageAction.RDT_DISCONNECT}`, {
					detail: { data: keystore },
				}) satisfies Z3USEvent,
			)
		} else if (keystore) {
			setCurrent(keystore)
		}
	}, [keystore])

	return <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
}
