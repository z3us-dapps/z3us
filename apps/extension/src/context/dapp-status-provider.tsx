import { DappStatusContext } from 'packages/ui/src/context/dapp-status'
import React, { type PropsWithChildren } from 'react'

import { useDappStatus } from '@src/hooks/use-dapp-status'

export const DappStatusProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const status = useDappStatus()
	return <DappStatusContext.Provider value={status}>{children}</DappStatusContext.Provider>
}
