import { createContext } from 'react'

import type { NoneSharedStore } from '../store'

export type TStoreContext = { id: string; store?: NoneSharedStore; z3usLogoLink?: React.ReactNode }

export const NoneSharedStoreContext = createContext<TStoreContext>({
	id: '',
})
