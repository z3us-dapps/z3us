import { type RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
import { useContext } from 'react'

import { RdtContext } from 'ui/src/context/rdt'

export type Rdt = ReturnType<typeof RadixDappToolkit>

export const useRdt = (): Rdt => useContext(RdtContext)!
