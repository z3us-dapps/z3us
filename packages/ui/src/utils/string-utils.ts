export const getShortAddress = (account = '', shortLength = 4) => {
	if (account === '') return ''
	if (typeof account !== 'string') return ''
	return `${account?.substring(0, shortLength)}...${account?.slice(-shortLength)}`
}
