import type { State } from 'packages/ui/src/context/dapp-status'
import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import browser from 'webextension-polyfill'

import { checkContentScript, showConnected, showDisconnected } from '@src/browser/content-script/status'
import { config } from '@src/config'

import { useIsUnlocked } from './use-is-unlocked'

// import { useNoneSharedStore, useSharedStore } from '@src/hooks/use-store'

const popupURL = new URL(browser.runtime.getURL(''))

const isLocalhost = (url?: URL) => url?.hostname === 'localhost' || url?.hostname === '127.0.0.1'

const isPopupPage = (url?: URL) => url?.hostname === popupURL.hostname

const isSecureHost = (url?: URL) => url?.protocol === 'https:'

export const useDappStatus = () => {
	const isUnlocked = useIsUnlocked()
	// const { approvedWebsites } = useNoneSharedStore(state => ({
	// 	approvedWebsites: state.approvedWebsites,
	// }))

	const [state, setState] = useImmer<State>({
		canConnectToTab: false,
		isConnected: false,
		currentTabId: 0,
		currentTabHost: '',
	})

	useEffect(() => {
		const load = async () => {
			const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
			const tabURL = tab?.url ? new URL(tab.url) : null
			const tabHost = tabURL?.host || ''

			const hasContentScript = await checkContentScript(tab.id)
			const isConnected = hasContentScript //&& tabHost in approvedWebsites

			setState(draft => {
				draft.isConnected = isConnected
				draft.currentTabId = tab?.id || 0
				draft.currentTabHost = tabHost
				draft.canConnectToTab =
					tabURL?.hostname && !isPopupPage(tabURL) && (isSecureHost(tabURL) || isLocalhost(tabURL))
			})

			if (isConnected) {
				showConnected()
			} else {
				showDisconnected()
			}
		}
		if (config.isExtensionContext && isUnlocked) load()
	}, [isUnlocked])

	return state
}
