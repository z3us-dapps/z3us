import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'

import { CompareWithDateContext } from './compare-with-date'

export const CompareWithDateProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const state = useState<Date | undefined>()

	return <CompareWithDateContext.Provider value={state}>{children}</CompareWithDateContext.Provider>
}

export default CompareWithDateProvider
