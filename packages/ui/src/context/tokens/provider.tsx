import type { PropsWithChildren } from 'react'
import React from 'react'

import { useTokens } from 'ui/src/hooks/queries/tokens'

import { TokensContext } from './context'

export const TokensProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { data: tokens = {} } = useTokens()

	return <TokensContext.Provider value={tokens}>{children}</TokensContext.Provider>
}

export default TokensProvider
