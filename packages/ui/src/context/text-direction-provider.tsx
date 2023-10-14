import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'

import type { Direction } from './text-direction'
import { TextDirectionContext } from './text-direction'

export const TextDirectionProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const state = useState<Direction>('ltr')

	return <TextDirectionContext.Provider value={state}>{children}</TextDirectionContext.Provider>
}

export default TextDirectionProvider
