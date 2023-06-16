import { createContext } from 'react'

import type { Rdt } from '@src/types'

export const RdtContext: any = createContext<Rdt | null>(null)
