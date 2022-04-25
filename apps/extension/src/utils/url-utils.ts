// TODO:
// possibly remove  ?
export const getHashedParams = (param: string) => {
	const url = window.location.hash
	const urlConatinsParams = url.includes('?')
	const searchParams = urlConatinsParams ? `?${url.split('?')[1]}` : ''
	const urlIncludesParam = url?.includes(param) || false
	return [urlIncludesParam, searchParams]
}

export const setParams = (param: string) => {
	// eslint-disable-next-line no-restricted-globals
	history.replaceState({}, 'Title', param)
}

export const getSplitParams = (param: object) => {
	if (!param) return ''
	const value = Object.values(param)?.[0] as string | ''
	return value.split('?')?.[0]
}

export const getParamString = (params: object, key: string) => {
	if (!params) return ''
	const value = params[key] as string | ''
	return value?.split('?')?.[0]
}
