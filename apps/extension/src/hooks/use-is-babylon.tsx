import { useState } from 'react'

export const useIsBabylon = () => {
	const [isBabylon] = useState<boolean>(true)

	return isBabylon
}
