import { createContext } from 'react'

import { type Token } from 'ui/src/hooks/queries/tokens'

type Tokens = { [address: string]: Token }

export const emptyState: Tokens = {}

export const TokensContext = createContext<Tokens>(emptyState)
