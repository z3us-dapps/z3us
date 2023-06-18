import { useContext } from 'react'

import { RdtContext } from '@src/context/rdt'
import type { Rdt } from '@src/types'

export const useRdt = (): Rdt => useContext(RdtContext)!
