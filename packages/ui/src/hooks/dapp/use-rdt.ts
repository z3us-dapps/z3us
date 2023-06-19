import { useContext } from 'react'

import { RdtContext } from 'ui/src/context/rdt'
import type { Rdt } from 'ui/src/types'

export const useRdt = (): Rdt => useContext(RdtContext)!
