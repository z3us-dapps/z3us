import { useContext } from 'react'

import { RdtContext } from '@src/context/rdt'

export const useRdt = () => {
	const rdt = useContext(RdtContext)

	return rdt
}
