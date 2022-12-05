import { createContext } from 'react'
import { NoneSharedStore } from '@src/store'
import { defaultNoneSharedStore } from '@src/services/state'

export const NoneSharedStoreContext = createContext<{ keystoreId: string; store: NoneSharedStore }>({
	keystoreId: '',
	store: defaultNoneSharedStore,
})
