import { getDefaultBackgroundForIndex, getDefaultColorSettingsForIndex } from '@src/config'

export const getDefaultAddressEntry = (index: number) => ({
	background: getDefaultBackgroundForIndex(index),
	colorSettings: getDefaultColorSettingsForIndex(index),
})
