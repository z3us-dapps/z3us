/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'

import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { useMessageClient } from '@src/hooks/use-message-client'

const redirectMap = {
	[KeystoreType.RADIX_WALLET]: '/keystore/new/radix',
	[KeystoreType.HARDWARE]: '/keystore/new/hardware-wallet',
}

const SetupChecker: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const client = useMessageClient()
	const outlet = useOutlet()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const load = async () => {
			try {
				switch (keystore?.type) {
					case KeystoreType.RADIX_WALLET:
					case KeystoreType.HARDWARE:
						const isUnlocked = await client.isVaultUnlocked()
						const isNotCompleted = await client.isSecretEmpty()
						if (isUnlocked && isNotCompleted && !location.pathname.startsWith('/keystore')) {
							navigate(redirectMap[keystore.type])
						}
						break
					default:
						break
				}
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error(err)
			} finally {
				setIsLoading(false)
			}
		}
		load()
	}, [keystore, location.pathname])

	if (isLoading) return <FallbackLoading />

	return outlet
}

export default SetupChecker
