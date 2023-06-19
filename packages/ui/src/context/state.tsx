import { createContext } from 'react'

import type { NoneSharedStore } from '../store'

export const NoneSharedStoreContext = createContext<{ id: string; store?: NoneSharedStore }>({ id: '' })
