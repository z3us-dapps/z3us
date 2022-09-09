import { useEffect } from 'react'
import { useSharedStore, useStore } from '@src/store'
import { askForHostPermissions } from '@src/utils/permissions'

export const usePermissionsVault = () => {
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectKeystoreId,
	}))
	const { networks } = useStore(state => ({
		networks: state.networks,
	}))

	useEffect(() => {
		try {
			askForHostPermissions(networks)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}, [keystoreId])
}
