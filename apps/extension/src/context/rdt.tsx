import type { Context } from 'react'
import { createContext } from 'react'

import type { Rdt } from '@src/types'

export const RdtContext: Context<Rdt | null> = createContext<Rdt | null>(null)
