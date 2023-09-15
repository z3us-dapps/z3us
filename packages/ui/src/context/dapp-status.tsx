import type { Context } from 'react'
import { createContext } from 'react'

export type State = {
	canConnectToTab: boolean
	isConnected: boolean
	currentTabId: number
	currentTabHost: string
}

export const defaultState = {
	canConnectToTab: false,
	isConnected: true,
	currentTabId: 0,
	currentTabHost: globalThis?.location?.hostname,
}

export const DappStatusContext: Context<State> = createContext<State>(defaultState)
