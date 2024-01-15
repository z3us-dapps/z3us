import type { FormatNumberOptions } from 'react-intl'

export const DECIMAL_STYLES: FormatNumberOptions = {
	style: 'decimal',
	maximumFractionDigits: 18,
}

export const CURRENCY_STYLES: FormatNumberOptions = {
	style: 'currency',
	maximumFractionDigits: 2,
}

export const PERCENTAGE_STYLES: FormatNumberOptions = {
	signDisplay: 'exceptZero',
	style: 'percent',
	maximumFractionDigits: 2,
}
