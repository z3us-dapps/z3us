export const getStringMetadata = (key: string, metadata: any[]): string =>
	metadata?.find(m => m.key === key)?.value.typed.value || ''
