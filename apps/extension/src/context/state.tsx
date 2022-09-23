import { createContext } from 'react'
import { AccountStore } from '@src/store'
import { defaultAccountStore } from '@src/services/state'

export const AccountContext = createContext<AccountStore>(defaultAccountStore)
