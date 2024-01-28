import { useContext } from 'react'

import { CompareWithDateContext } from 'ui/src/context/compare-with-date'

export const useCompareWithDate = () => useContext(CompareWithDateContext)!
