import { useContext } from 'react'

import { RdtContext } from '@src/context/rdt'

export const useRdt = () => useContext(RdtContext)
