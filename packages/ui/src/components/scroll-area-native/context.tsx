import { createContext } from 'react'

export type Context = { scrollableNode: HTMLElement | null; isScrolledTop: boolean }

export const ScrollContext = createContext<Context>({
	scrollableNode: null,
	isScrolledTop: true,
})
