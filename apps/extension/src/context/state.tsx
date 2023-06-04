import { createContext } from 'react'

import { defaultNoneSharedStore } from '@src/services/state'
import type { NoneSharedStore } from '@src/store'

export const NoneSharedStoreContext = createContext<{ keystoreId: string; store: NoneSharedStore }>({
	keystoreId: '',
	store: defaultNoneSharedStore,
})
