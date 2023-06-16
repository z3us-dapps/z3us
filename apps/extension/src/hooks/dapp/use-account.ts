/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Account } from '@radixdlt/radix-dapp-toolkit'
import React, { useEffect } from 'react'

import { useRdt } from './use-rdt'

export const useAccount = (accountAddress: string) => {
	// const rdt = useRdt()
	const [state, useState] = React.useState<Account>()

	// useEffect(() => {
	// 	rdt.gatewayApi
	// 		.getEntityDetails(accountAddress)
	// 		.map(accounts => useState(accounts))
	// 		.mapErr(() => useState(undefined))
	// }, [accountAddress])

	return state
}
