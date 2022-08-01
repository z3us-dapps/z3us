export const getHeadTailString = (str: string | number, strLength: number = 4) => {
	const convertedStr = `${str}`
	if (convertedStr === '') return ''
	return `${convertedStr?.substring(0, strLength)}...${convertedStr?.slice(-strLength)}`
}
