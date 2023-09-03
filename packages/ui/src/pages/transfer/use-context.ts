import { useContext } from 'react'

import type { ContextValues } from './context'
import { Context as TransferContext } from './context'

export const useTransferContext = (): ContextValues => useContext(TransferContext)
