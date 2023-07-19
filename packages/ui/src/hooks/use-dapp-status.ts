import { useContext } from 'react'

import { DappStatusContext } from 'ui/src/context/dapp-status'

export const useDappStatus = () => useContext(DappStatusContext)!
