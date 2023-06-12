import { useEffect } from 'react'
import React from 'react'

import { useRdt } from './use-rdt'

export const useAccount = (accountAddress: string) => {
	const rdt = useRdt()
	const [state, useState] = React.useState<any>()

	useEffect(() => {
		rdt.gatewayApi
			.getEntityDetails(accountAddress)
			.map(accounts => useState(accounts))
			.mapErr(() => useState(undefined))
	}, [accountAddress])

	return state
}
