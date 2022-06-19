import { useEffect, useState } from 'react'
import { useStore } from '@src/store'
import { RadixService } from '@src/services/radix'

export const useRadix = () => {
	const { network } = useStore(state => ({
		network: state.networks[state.selectedNetworkIndex],
	}))
	const [service, setService] = useState<RadixService>(new RadixService(network.url))

	useEffect(() => {
		setService(new RadixService(network.url))
	}, [network.url])

	return service
}
