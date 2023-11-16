import { useContext } from 'react'

import type { Confirm } from 'ui/src/context/confirm'
import { ConfirmContext } from 'ui/src/context/confirm'

export const useConfirm = (): Confirm => useContext(ConfirmContext)!
