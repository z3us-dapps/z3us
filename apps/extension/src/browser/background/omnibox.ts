import type { Omnibox } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

const popupURL = new URL(browser.runtime.getURL(''))
const websiteURL = `${popupURL}src/pages/app/index.html`

export const handleChange = (text: string, suggest: (suggestResults: Omnibox.SuggestResult[]) => void) => {
	const suggestions = []
	if (text.startsWith('resource_')) {
		suggestions.push({
			content: `#/accounts/-/tokens/${encodeURIComponent(text)}`,
			description: `Show resource ${text} on <match>Z3US</match>`,
			deletable: false,
		})
	} else if (text.startsWith('account_')) {
		suggestions.push({
			content: `#/accounts/${encodeURIComponent(text)}`,
			description: `Show account ${text} on <match>Z3US</match>`,
			deletable: false,
		})
	} else if (text.startsWith('txid_')) {
		suggestions.push({
			content: `#/accounts?tx=${encodeURIComponent(text)}`,
			description: `Show transaction ${text} on <match>Z3US</match>`,
			deletable: false,
		})
	} else {
		suggestions.push({
			content: `#/accounts/?query=${encodeURIComponent(text)}`,
			description: `Find ${text} on <match>Z3US</match>`,
			deletable: false,
		})
	}
	suggest(suggestions)
}

export const handleEnter = (text: string) => {
	let newURL = `${websiteURL}${text}`
	if (!text.startsWith('#/')) {
		newURL = websiteURL
	}
	browser.tabs.create({ url: newURL })
}

export const handleStart = () => {
	chrome.omnibox.setDefaultSuggestion({
		description: `Open Z3US extension page`,
	})
}

browser.omnibox.onInputStarted.addListener(handleStart)
browser.omnibox.onInputChanged.addListener(handleChange)
browser.omnibox.onInputEntered.addListener(handleEnter)
