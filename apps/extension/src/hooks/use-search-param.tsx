import { useEffect, useState } from 'react'
import { getHashedParams } from '@src/utils/url-utils'

export const useSearchParam = (param: string) => {
	const [value, setValue] = useState(() => getHashedParams(param))

	useEffect(() => {
		const onChange = () => setValue(getHashedParams(param))

		window.addEventListener('popstate', onChange)
		window.addEventListener('pushstate', onChange)
		window.addEventListener('replacestate', onChange)

		return () => {
			window.removeEventListener('popstate', onChange)
			window.removeEventListener('pushstate', onChange)
			window.removeEventListener('replacestate', onChange)
		}
	}, [param])

	return value
}
