import { generateId } from 'packages/ui/src/utils/generate-id'
import React, { type PropsWithChildren, createContext } from 'react'

const runtimeId = generateId()

export const Context = createContext<string>(runtimeId)

export const Provider: React.FC<PropsWithChildren> = ({ children }) => (
	<Context.Provider value={runtimeId}>{children}</Context.Provider>
)
