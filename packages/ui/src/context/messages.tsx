import type React from 'react'
import { createContext } from 'react'
import type { IntlProvider } from 'react-intl'

export type IntlProviderProps = React.ComponentProps<typeof IntlProvider>

export const MessagesContext = createContext<
	[IntlProviderProps['messages'], React.Dispatch<React.SetStateAction<IntlProviderProps['messages']>>]
>([undefined, () => {}])
