import type { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
import type { Context } from 'react'
import { createContext } from 'react'

export const RdtContext: Context<RadixDappToolkit | null> = createContext<RadixDappToolkit | null>(null)
