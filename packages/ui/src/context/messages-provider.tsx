import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'
import type { IntlProvider } from 'react-intl'

import { MessagesContext } from './messages'

type IntlProviderProps = React.ComponentProps<typeof IntlProvider>

export const MessagesProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const state = useState<IntlProviderProps['messages']>()

	return <MessagesContext.Provider value={state}>{children}</MessagesContext.Provider>
}

export default MessagesProvider
