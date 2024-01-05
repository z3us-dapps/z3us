import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import browser from 'webextension-polyfill'

import { DAPP_ORIGIN } from 'ui/src/constants/dapp'
import type { State } from 'ui/src/context/dapp-status'

import { checkContentScript } from '@src/browser/content-script/status'

import { useIsUnlocked } from './use-is-unlocked'

const defaultState = {
	canConnectToTab: false,
	isConnected: false,
	currentTabId: 0,
	currentTabHost: '',
}

const z3usURL = new URL(DAPP_ORIGIN)

const popupURL = new URL(browser.runtime.getURL(''))

const isLocalhost = (url?: URL) => url?.hostname === 'localhost' || url?.hostname === '127.0.0.1'

const isPopupPage = (url?: URL) => url?.hostname === popupURL.hostname

const isSecureHost = (url?: URL) => url?.protocol === 'https:'

export const useDappStatus = () => {
	const { isUnlocked } = useIsUnlocked()

	const [state, setState] = useImmer<State>(defaultState)

	useEffect(() => {
		if (!isUnlocked) {
			setState(defaultState)
		} else {
			browser.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
				const tabURL = tab?.url ? new URL(tab.url) : new URL(window.location.href)
				const tabHost = tabURL?.host || ''

				checkContentScript(tab.id).then(hasContentScript => {
					const isConnected = !!hasContentScript

					setState(draft => {
						draft.isConnected = isConnected
						draft.currentTabId = tab?.id || 0
						draft.currentTabHost = isPopupPage(tabURL) ? z3usURL.host : tabHost
						draft.canConnectToTab =
							tabURL?.hostname && !isPopupPage(tabURL) && (isSecureHost(tabURL) || isLocalhost(tabURL))
					})
				})
			})
		}
	}, [isUnlocked])

	return state
}
