import { createContext } from 'react'

export type Context = { scrollableNode: HTMLElement | null }

export const ScrollContext = createContext<Context>({
	scrollableNode: null,
})
