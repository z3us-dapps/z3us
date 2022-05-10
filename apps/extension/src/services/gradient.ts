import { ColorSettings } from '@src/services/types'

export const PRESET_COLOR_LIGHT_ORCHID = 'preset_color_light_orchid'
export const PRESET_COLOR_MINDARO = 'preset_color_mindaro'
export const PRESET_COLOR_CERISE = 'preset_color_cerise'
export const PRESET_COLOR_JACARTA = 'preset_color_jacarta'
export const PRESET_COLOR_CORNFLOW_BLUE = 'preset_color_cornflower_blue'
export const PRESET_COLOR_MARTINIQUE = 'preset_color_martinique'

export const presetMap = {
	[PRESET_COLOR_LIGHT_ORCHID]: {
		[ColorSettings.COLOR_PRIMARY]: '#eeabe0',
		[ColorSettings.COLOR_PRIMARY_STOP]: '0',
		[ColorSettings.COLOR_SECONDARY]: '#f7dbbf',
		[ColorSettings.COLOR_SECONDARY_STOP]: '100',
		[ColorSettings.COLOR_TEXT]: '#330867',
		[ColorSettings.GRADIENT_TYPE]: 'radial',
	},
	[PRESET_COLOR_MINDARO]: {
		[ColorSettings.COLOR_PRIMARY]: '#d8fb91',
		[ColorSettings.COLOR_PRIMARY_STOP]: '0',
		[ColorSettings.COLOR_SECONDARY]: '#55b3c8',
		[ColorSettings.COLOR_SECONDARY_STOP]: '100',
		[ColorSettings.COLOR_TEXT]: '#330867',
		[ColorSettings.GRADIENT_TYPE]: 'radial',
	},
	[PRESET_COLOR_CERISE]: {
		[ColorSettings.COLOR_PRIMARY]: '#d83773',
		[ColorSettings.COLOR_PRIMARY_STOP]: '0',
		[ColorSettings.COLOR_SECONDARY]: '#392617',
		[ColorSettings.COLOR_SECONDARY_STOP]: '100',
		[ColorSettings.COLOR_TEXT]: '#e8d1bf',
		[ColorSettings.GRADIENT_TYPE]: 'radial',
	},
	[PRESET_COLOR_JACARTA]: {
		[ColorSettings.COLOR_PRIMARY]: '#3c2a61',
		[ColorSettings.COLOR_PRIMARY_STOP]: '0',
		[ColorSettings.COLOR_SECONDARY]: '#33069e',
		[ColorSettings.COLOR_SECONDARY_STOP]: '100',
		[ColorSettings.COLOR_TEXT]: '#ddfaff',
		[ColorSettings.GRADIENT_TYPE]: 'radial',
	},
	[PRESET_COLOR_CORNFLOW_BLUE]: {
		[ColorSettings.COLOR_PRIMARY]: '#7980f4',
		[ColorSettings.COLOR_PRIMARY_STOP]: '0',
		[ColorSettings.COLOR_SECONDARY]: '#f2cacd',
		[ColorSettings.COLOR_SECONDARY_STOP]: '100',
		[ColorSettings.COLOR_TEXT]: '#ffe9ff',
		[ColorSettings.GRADIENT_TYPE]: 'radial',
	},
	[PRESET_COLOR_MARTINIQUE]: {
		[ColorSettings.COLOR_PRIMARY]: '#282c4e',
		[ColorSettings.COLOR_PRIMARY_STOP]: '50',
		[ColorSettings.COLOR_SECONDARY]: '#04211e',
		[ColorSettings.COLOR_SECONDARY_STOP]: '150',
		[ColorSettings.COLOR_TEXT]: '#defffb',
		[ColorSettings.GRADIENT_TYPE]: 'radial',
	},
}

export const colorMap = {
	[ColorSettings.COLOR_TEXT]: { title: 'Text color' },
	[ColorSettings.COLOR_PRIMARY]: { title: 'Color 1' },
	[ColorSettings.COLOR_SECONDARY]: { title: 'Color 2' },
}

export const generateGradient = (
	gradientType: string,
	primary: string,
	primaryStop: string,
	secondary: string,
	secondaryStop: string,
) => {
	const isRadialGradient = gradientType === 'radial'
	return isRadialGradient
		? `radial-gradient(circle at 50% 0%, ${primary} ${primaryStop}%, ${secondary} ${secondaryStop}%)`
		: `linear-gradient(90deg, ${primary} ${primaryStop}%, ${secondary} ${secondaryStop}%)`
}

export const getDefaultBackgroundForIndex = (idx: number): string => {
	const keys = Object.keys(presetMap)
	const preset = presetMap[keys[idx % keys.length]]
	return generateGradient(
		preset[ColorSettings.GRADIENT_TYPE],
		preset[ColorSettings.COLOR_PRIMARY],
		preset[ColorSettings.COLOR_PRIMARY_STOP],
		preset[ColorSettings.COLOR_SECONDARY],
		preset[ColorSettings.COLOR_SECONDARY_STOP],
	)
}
