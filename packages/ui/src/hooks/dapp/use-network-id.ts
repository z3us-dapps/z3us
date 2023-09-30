import { useEffect, useState } from 'react'

import { config } from '../../constants/config'
import { useNetworkConfiguration } from './use-network'

export const useNetworkId = () => {
	const { data } = useNetworkConfiguration()
	const [state, setState] = useState<number>(config.defaultNetworkId)

	useEffect(() => {
		if (data?.network_id) setState(data?.network_id)
	}, [data])

	return state
}
