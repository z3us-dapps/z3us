import { createContext } from 'react'

import { defaultNoneSharedStore } from '@src/services/state'
import type { NoneSharedStore } from '@src/store'

export const NoneSharedStoreContext = createContext<{ id: string; store: NoneSharedStore }>({
	id: '',
	store: defaultNoneSharedStore,
})
