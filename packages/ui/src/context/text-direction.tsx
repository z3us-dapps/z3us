import type React from 'react'
import { createContext } from 'react'
import type { IntlProvider } from 'react-intl'

export type IntlProviderProps = React.ComponentProps<typeof IntlProvider>

export type Direction = 'rtl' | 'ltr'

export const TextDirectionContext = createContext<[Direction, React.Dispatch<React.SetStateAction<Direction>>]>([
	'ltr',
	() => {},
])
