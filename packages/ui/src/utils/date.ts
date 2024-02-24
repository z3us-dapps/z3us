const defaultDateTime: Intl.DateTimeFormatOptions = {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
	hour12: false, // Use 24-hour format
	timeZone: 'UTC', // Set the time zone to UTC
}

export function formatDateTime(date: Date, options: Intl.DateTimeFormatOptions = defaultDateTime): string {
	if (!date) return ''
	const formatter = new Intl.DateTimeFormat('en-GB', options)
	return formatter.format(date)
}

export const defaultDateOptions: Intl.DateTimeFormatOptions = {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
	hour12: false, // Use 24-hour format
	timeZone: 'UTC', // Set the time zone to UTC
}

export function formatDate(date: Date, options: Intl.DateTimeFormatOptions = defaultDateOptions): string {
	if (!date) return ''
	const formatter = new Intl.DateTimeFormat('en-GB', options)
	return formatter.format(date)
}
