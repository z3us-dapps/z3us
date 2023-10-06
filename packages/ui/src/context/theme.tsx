import type { Context } from 'react'
import { createContext } from 'react'

import { Theme } from 'ui/src/types/types'

export type State = {
	theme: Theme
	resolvedTheme: Omit<Theme, Theme.SYSTEM>
	setTheme: (t: Theme) => void
}

export const ThemeContext: Context<State> = createContext<State>({
	theme: Theme.SYSTEM,
	resolvedTheme: Theme.LIGHT,
	setTheme: () => {},
})
