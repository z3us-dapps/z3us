export const handleOmniboxChange = (text, suggest) => {
	suggest([
		{ content: `${text}`, description: 'TODO: Implement actual logic here' },
		{ content: `${text} one`, description: 'the first one' },
		{ content: `${text} number two`, description: 'the second entry' },
	])
}
