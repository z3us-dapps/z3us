import type { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
import { useContext } from 'react'

import { RdtContext } from 'ui/src/context/rdt'

export const useRdt = (): RadixDappToolkit => useContext(RdtContext)!
