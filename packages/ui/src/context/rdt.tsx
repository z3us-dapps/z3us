// @ts-nocheck
// TODO: fix ts
import { type Rdt } from '@radixdlt/radix-dapp-toolkit'
import type { Context } from 'react'
import { createContext } from 'react'

export const RdtContext: Context<Rdt | null> = createContext<Rdt | null>(null)
