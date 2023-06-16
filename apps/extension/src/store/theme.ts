import { ThemeState } from './types'

export const factory = (set): ThemeState => ({
	theme: 'system',

	setThemeAction: async (theme: string) => {
		set(state => {
			state.theme = theme
		})
	},
})
