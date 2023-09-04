import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useRdtState } from './use-rdt-state'

export const useSelectedAccounts = (): string[] => {
	const { accountId = '-' } = useParams()
	const { accounts = [], persona } = useRdtState()

	return useMemo(
		() => accounts?.map(({ address }) => address).filter(address => accountId === '-' || accountId === address),
		[accountId, persona?.identityAddress],
	)
}
