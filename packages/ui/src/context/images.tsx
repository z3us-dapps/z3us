import type { Context } from 'react'
import { createContext } from 'react'

export type State = Map<string, string>

export const defaultState: State = new Map()

export const ImageContext: Context<State> = createContext<State>(defaultState)
