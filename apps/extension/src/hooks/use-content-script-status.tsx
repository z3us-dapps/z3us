import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import browser from 'webextension-polyfill'

import { useNoneSharedStore, useSharedStore } from '@src/hooks/use-store'
import browserService from '@src/services/browser'
import { checkContentScript, showConnected, showDisconnected } from '@src/services/content-script'

const popupURL = new URL(browser.runtime.getURL(''))

interface ImmerT {
	canConnectToTab: boolean
	isConnected: boolean
	currentTabId: number
	currentTabHost: string
}

const isLocalhost = (url?: URL) => url?.hostname === 'localhost' || url?.hostname === '127.0.0.1'

const isPopupPage = (url?: URL) => url?.hostname === popupURL.hostname

const isSecureHost = (url?: URL) => url?.protocol === 'https:'

export const useContentScriptStatus = () => {
	const { isUnlocked } = useSharedStore(state => ({
		isUnlocked: state.isUnlocked,
	}))
	const { approvedWebsites } = useNoneSharedStore(state => ({
		approvedWebsites: state.approvedWebsites,
	}))

	const [state, setState] = useImmer<ImmerT>({
		canConnectToTab: false,
		isConnected: false,
		currentTabId: 0,
		currentTabHost: '',
	})

	useEffect(() => {
		const load = async () => {
			const tab = await browserService.getCurrentTab()
			const tabURL = tab?.url ? new URL(tab.url) : null
			const tabHost = tabURL?.host || ''

			const hasContentScript = await checkContentScript(tab.id)
			const isConnected = hasContentScript && tabHost in approvedWebsites

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
		if (isUnlocked) load()
	}, [isUnlocked])

	return state
}
