import type RnsSDK from '@radixnameservice/rns-sdk'
import type { Context } from 'react'
import { createContext } from 'react'

export const RnsContext: Context<RnsSDK | null> = createContext<RnsSDK | null>(null)
