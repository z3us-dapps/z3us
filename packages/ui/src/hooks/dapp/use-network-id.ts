import { useEffect, useState } from 'react'

import { config } from '../../constants/config'
import { useNoneSharedStore } from '../use-store'
import { useNetworkConfiguration } from './use-network'

export const useNetworkId = () => {
	const { data } = useNetworkConfiguration()
	const { gatewayBaseUrl } = useNoneSharedStore(state => ({
		gatewayBaseUrl: state.gatewayBaseUrl,
	}))
	const [state, setState] = useState<number>(config.defaultNetworkId)

	useEffect(() => {
		setState(data?.network_id || config.defaultNetworkId)
	}, [gatewayBaseUrl, data?.network_id])

	return state
}
