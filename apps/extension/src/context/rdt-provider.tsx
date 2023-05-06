import React from 'react'

import { Rdt } from '@src/types'

import { RdtContext } from './rdt'

export const RdtProvider = ({
	children,
	value,
}: React.PropsWithChildren<{
	value: Rdt
}>) => <RdtContext.Provider value={value}>{children}</RdtContext.Provider>
