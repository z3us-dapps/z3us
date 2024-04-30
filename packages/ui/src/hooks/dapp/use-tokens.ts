import { useContext } from 'react'

import { TokensContext } from 'ui/src/context/tokens/context'

export const useTokens = () => useContext(TokensContext)!
