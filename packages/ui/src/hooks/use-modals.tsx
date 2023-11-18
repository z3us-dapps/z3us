import { useContext } from 'react'

import { ModalsContext } from 'ui/src/context/modals'

export const useModals = () => useContext(ModalsContext)
