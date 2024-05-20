import { useContext } from 'react'

import type { Context } from './context'
import { ScrollContext } from './context'

export const useScroll = (): Context => useContext(ScrollContext)
