import { createContext } from 'react'

import { Rdt } from '@src/types'

export const RdtContext = createContext<Rdt | null>(null)
