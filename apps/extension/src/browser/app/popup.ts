import { createPopupWindow } from '@radixdlt/connector-extension/src/chrome/helpers/create-popup-window'
import { focusWindow } from '@radixdlt/connector-extension/src/chrome/helpers/focus-window'
import { getActiveWindow } from '@radixdlt/connector-extension/src/chrome/helpers/get-active-window'
import { getExtensionTabsByUrl } from '@radixdlt/connector-extension/src/chrome/helpers/get-extension-tabs-by-url'
import { getPopupId } from '@radixdlt/connector-extension/src/chrome/helpers/get-popup-id'
import { setPopupId } from '@radixdlt/connector-extension/src/chrome/helpers/set-popup-id'

import { config } from '@src/config'

export const openAppPopup = async () => {
	const result = await getExtensionTabsByUrl(config.popup.pages.app)
	if (result.isErr()) throw result.error

	const isPopupWindowOpen = result.value.length > 0

	const windowResult = await getActiveWindow()
	if (windowResult.isErr()) throw windowResult.error
	const { width, left, height, top } = windowResult.value

	if (isPopupWindowOpen) {
		getPopupId().andThen(focusWindow)
		return
	}
	createPopupWindow(config.popup.pages.app, {
		width,
		left,
		height,
		top,
	}).andThen(popup => setPopupId(popup?.id))
}
