import RnsSDK from '@radixnameservice/rns-sdk'
import type { Omnibox } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

const popupURL = new URL(browser.runtime.getURL(''))
const websiteURL = `${popupURL}src/pages/app/system.html`
const rns = new RnsSDK({ network: 'mainnet' })

export const handleChange = (text: string, suggest: (suggestResults: Omnibox.SuggestResult[]) => void) => {
	if (text.endsWith('.xrd')) {
		rns
			.resolveRecord({
				domain: text,
				context: 'navigation',
				directive: 'website:redirect',
			})
			.then(redirectVal => {
				if (redirectVal?.value) {
					suggest([
						{
							content: `@redirect:${redirectVal?.value}`,
							description: `Go to <match>${text}</match>'s website`,
							deletable: false,
						},
					])
				}
			})
	} else if (text.startsWith('resource_')) {
		suggest([
			{
				content: `#/accounts/-/tokens/${encodeURIComponent(text)}`,
				description: `Show resource ${text} on <match>Z3US</match>`,
				deletable: false,
			},
		])
	} else if (text.startsWith('account_')) {
		suggest([
			{
				content: `#/accounts/${encodeURIComponent(text)}`,
				description: `Show account ${text} on <match>Z3US</match>`,
				deletable: false,
			},
		])
	} else if (text.startsWith('txid_')) {
		suggest([
			{
				content: `#/accounts?tx=${encodeURIComponent(text)}`,
				description: `Show transaction ${text} on <match>Z3US</match>`,
				deletable: false,
			},
		])
	} else {
		suggest([
			{
				content: `#/accounts/?query=${encodeURIComponent(text)}`,
				description: `Find ${text} on <match>Z3US</match>`,
				deletable: false,
			},
		])
	}
}

export const handleEnter = async (text: string) => {
	if (text.startsWith('#/')) {
		browser.tabs.update({ url: `${websiteURL}${text}` })
	} else if (text.startsWith('@redirect:')) {
		browser.tabs.update({ url: text.slice('@redirect:'.length) })
	} else {
		browser.tabs.update({ url: websiteURL })
	}
}

export const handleStart = () => {
	browser.omnibox.setDefaultSuggestion({
		description: `Open Z3US extension page`,
	})
}

browser.omnibox.onInputStarted.addListener(handleStart)
browser.omnibox.onInputChanged.addListener(handleChange)
browser.omnibox.onInputEntered.addListener(handleEnter)
