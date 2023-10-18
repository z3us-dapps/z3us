import type { Omnibox } from 'webextension-polyfill'

export const handleOmniboxChange = (text: string, suggest: (suggestResults: Omnibox.SuggestResult[]) => void) => {
	suggest([
		{ content: `${text}`, description: 'TODO: Implement actual logic here' },
		{ content: `${text} one`, description: 'the first one' },
		{ content: `${text} number two`, description: 'the second entry' },
	])
}
