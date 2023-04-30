import { Network as NetworkID } from '@radixdlt/application'

import { explorerURLMap } from '@src/config'
import { useNoneSharedStore } from '@src/hooks/use-store'

export const useExplorerURL = () => {
	const { network } = useNoneSharedStore(state => ({
		network: state.networks[state.selectedNetworkIndex],
	}))
	const explorerURL = explorerURLMap[network?.id || NetworkID.MAINNET]

	return explorerURL
}
