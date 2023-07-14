import { DappStatusContext } from 'packages/ui/src/context/dapp-status'
import React, { type PropsWithChildren } from 'react'

import { config } from '@src/config'

const useDappStatus = config.isExtensionContext
	? (await import('@src/hooks/use-dapp-status')).useDappStatus
	: () => null

export const DappStatusProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const status = useDappStatus()
	return <DappStatusContext.Provider value={status}>{children}</DappStatusContext.Provider>
}
