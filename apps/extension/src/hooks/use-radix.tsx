import { useEffect, useState } from 'react'

import { useNoneSharedStore } from '@src/hooks/use-store'
import { RadixService } from '@src/services/radix'

export const useRadix = () => {
	const { network } = useNoneSharedStore(state => ({
		network: state.networks[state.selectedNetworkIndex],
	}))
	const [service, setService] = useState<RadixService>(new RadixService(network.url))

	useEffect(() => {
		setService(new RadixService(network.url))
	}, [network.url])

	return service
}
