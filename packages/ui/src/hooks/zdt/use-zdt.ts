import { useContext } from 'react'

import type { State } from 'ui/src/context/zdt'
import { ZdtContext } from 'ui/src/context/zdt'

export const useZdtState = (): State => useContext(ZdtContext)!
