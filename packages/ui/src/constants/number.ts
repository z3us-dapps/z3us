import type { FormatNumberOptions } from 'react-intl'

export const DECIMAL_STYLES: FormatNumberOptions = {
	style: 'decimal',
	maximumFractionDigits: 18,
	minimumFractionDigits: 2,
	maximumSignificantDigits: 3,
}

export const TOOLTIP_DECIMAL_STYLES: FormatNumberOptions = {
	style: 'decimal',
	maximumFractionDigits: 18,
}

export const CURRENCY_STYLES: FormatNumberOptions = {
	style: 'currency',
	maximumSignificantDigits: 3,
	minimumFractionDigits: 2,
}

export const TOOLTIP_CURRENCY_STYLES: FormatNumberOptions = {
	style: 'currency',
	minimumFractionDigits: 2,
}

export const PERCENTAGE_STYLES: FormatNumberOptions = {
	style: 'percent',
	maximumFractionDigits: 2,
}
