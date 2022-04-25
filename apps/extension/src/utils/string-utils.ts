export const getInitials = (name: string) => {
	const initials = Array.prototype.map.call(name.split(' '), x => x.substring(0, 1).toUpperCase()).join('')
	return initials.substring(0, 2)
}

export const getShortAddress = (account = '') => {
	if (account === '') return ''
	return `${account?.substring(0, 4)}...${account?.slice(-4)}`
}
