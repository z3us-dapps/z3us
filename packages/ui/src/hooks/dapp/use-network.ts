import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { config } from 'ui/src/constants/config'

import { useNoneSharedStore } from '../use-store'
import { useGatewayClient } from './use-gateway-client'

export const useNetworkConfiguration = () => {
	const { status } = useGatewayClient()!
	const { gatewayBaseUrl } = useNoneSharedStore(state => ({
		gatewayBaseUrl: state.gatewayBaseUrl,
	}))

	return useQuery({
		queryKey: ['useNetworkConfiguration', gatewayBaseUrl],
		queryFn: () => status.getNetworkConfiguration(),
		enabled: !!status,
	})
}

export const useCurrentStatus = () => {
	const { status } = useGatewayClient()!
	const { gatewayBaseUrl } = useNoneSharedStore(state => ({
		gatewayBaseUrl: state.gatewayBaseUrl,
	}))

	return useQuery({
		queryKey: ['useCurrent', gatewayBaseUrl],
		queryFn: () => status.getCurrent(),
		enabled: !!status,
		refetchInterval: 30 * 1000,
	})
}

export const useNetworkId = () => {
	const { data } = useNetworkConfiguration()
	const [state, setState] = useState<number>(config.defaultNetworkId)

	useEffect(() => {
		if (data?.network_id) setState(data?.network_id)
	}, [data])

	return state
}

export const useDashboardUrl = () => {
	const { data } = useNetworkConfiguration()
	const [state, setState] = useState<string>(config.defaultExplorerURL)

	useEffect(() => {
		if (data?.network_id) setState(RadixNetworkConfigById[data.network_id].dashboardUrl)
	}, [data])

	return state
}

export const useGatewayUrl = () => {
	const { data } = useNetworkConfiguration()
	const [state, setState] = useState<string>(config.defaultGatewayBaseUrl)

	useEffect(() => {
		if (data?.network_id) setState(RadixNetworkConfigById[data.network_id].gatewayUrl)
	}, [data])

	return state
}
