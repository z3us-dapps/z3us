import type React from 'react'
import { createContext } from 'react'

export const CompareWithDateContext = createContext<
	[Date | undefined, React.Dispatch<React.SetStateAction<Date | undefined>>]
>([undefined, () => {}])
