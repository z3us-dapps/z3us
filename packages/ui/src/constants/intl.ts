const getFlagEmoji = countryCode =>
	String.fromCodePoint(...[...countryCode.toUpperCase()].map(x => 0x1f1a5 + x.charCodeAt()))

export const languages = {
	en: { name: 'English', flag: getFlagEmoji('US') },
	zh: { name: '中国人', flag: getFlagEmoji('CN') },
	es: { name: 'Española', flag: getFlagEmoji('ES') },
	ru: { name: 'Русский', flag: getFlagEmoji('RU') },
	ar: { name: 'عربي', flag: getFlagEmoji('AE') },
	pt: { name: 'Português', flag: getFlagEmoji('PT') },
	fr: { name: 'Français', flag: getFlagEmoji('FR') },
	de: { name: 'Deutsch', flag: getFlagEmoji('DE') },
	it: { name: 'Italiano', flag: getFlagEmoji('IT') },
	pl: { name: 'Polski', flag: getFlagEmoji('PL') },
	jp: { name: '日本語', flag: getFlagEmoji('JP') },
}

export function getDirection(locale: keyof typeof languages) {
	switch (locale) {
		case 'ar':
			return 'rtl'
		default:
			return 'ltr'
	}
}
