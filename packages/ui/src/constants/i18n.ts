const getFlagEmoji = countryCode =>
	String.fromCodePoint(...[...countryCode.toUpperCase()].map(x => 0x1f1a5 + x.charCodeAt()))

export const languages = {
	enUS: { name: 'English', flag: getFlagEmoji('US') },
	pl: { name: 'Polski', flag: getFlagEmoji('PL') },
}
