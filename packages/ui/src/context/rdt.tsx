import type { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
import type { Context } from 'react'
import { createContext } from 'react'

export type Rdt = ReturnType<typeof RadixDappToolkit>

export const RdtContext: Context<Rdt | null> = createContext<Rdt | null>(null)
