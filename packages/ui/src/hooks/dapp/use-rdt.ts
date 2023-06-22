import { useContext } from 'react'

import type { Rdt } from 'ui/src/context/rdt'
import { RdtContext } from 'ui/src/context/rdt'

export const useRdt = (): Rdt => useContext(RdtContext)!
