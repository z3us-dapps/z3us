import { type IThemeStateSetter, type ThemeState } from './types'

export const factory = (set: IThemeStateSetter): ThemeState => ({
	theme: 'system',

	setThemeAction: async (theme: string) => {
		set(state => {
			state.theme = theme
		})
	},
})
