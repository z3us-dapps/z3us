import type RnsSDK from '@radixnameservice/rns-sdk'
import { useContext } from 'react'

import { RnsContext } from 'ui/src/context/rns'

export const useRns = (): RnsSDK => useContext(RnsContext)!
