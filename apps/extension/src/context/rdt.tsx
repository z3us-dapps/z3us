import { createContext } from 'react'

import type { Rdt } from '@src/types'

export const RdtContext = createContext<Rdt | null>(null)
