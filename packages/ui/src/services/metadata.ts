export const getStringMetadata = (key: string, metadata: any[]): string =>
	metadata?.find(m => m.key === key)?.value.typed.value || ''

export const getStringNftData = (key: string, fields: any[]): string =>
	fields?.find(m => m.field_name === key)?.value || ''
