import type { Context } from 'react'
import { createContext } from 'react'

export type State = {
	canConnectToTab: boolean
	isConnected: boolean
	currentTabId: number
	currentTabHost: string
}

export const DappStatusContext: Context<State | null> = createContext<State | null>(null)
