import React, { type PropsWithChildren, createContext } from 'react'

import { generateId } from 'ui/src/utils/rand'

const runtimeId = generateId()

export const Context = createContext<string>(runtimeId)

export const Provider: React.FC<PropsWithChildren> = ({ children }) => (
	<Context.Provider value={runtimeId}>{children}</Context.Provider>
)
