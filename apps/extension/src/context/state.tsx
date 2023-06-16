import { createContext } from 'react'

import type { NoneSharedStore } from '@src/store'

export const NoneSharedStoreContext = createContext<{ id: string; store?: NoneSharedStore }>({ id: '' })
