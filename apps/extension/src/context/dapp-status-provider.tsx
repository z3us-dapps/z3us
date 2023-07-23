import { DappStatusContext } from 'packages/ui/src/context/dapp-status'
import React, { type PropsWithChildren, useEffect, useRef } from 'react'

import { config } from '@src/config'

const useStatus = () => {
	const ref = useRef(() => null)

	useEffect(() => {
		if (!config.isExtensionContext) return
		import('@src/hooks/use-dapp-status').then(({ useDappStatus }) => {
			ref.current = useDappStatus
		})
	}, [])

	return ref.current()
}

export const DappStatusProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const status = useStatus()
	return <DappStatusContext.Provider value={status}>{children}</DappStatusContext.Provider>
}
