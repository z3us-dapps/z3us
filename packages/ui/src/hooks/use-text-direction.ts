import { useContext } from 'react'

import { TextDirectionContext } from 'ui/src/context/text-direction'

export const useTextDirection = () => useContext(TextDirectionContext)!
