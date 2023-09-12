import { useBabylonStatus } from './react-query/queries/babylon'

export const useIsBabylon = () => {
	const { data = 0 } = useBabylonStatus()
	return data > 0
}
