export type ThemeStore = {
	theme: string
	setThemeAction: (theme: string) => void
}

export const whiteList = ['theme']

export const createThemeStore = set => ({
	theme: 'light',

	setThemeAction: (theme: string) => {
		set(state => {
			state.theme = theme
		})
	},
})
