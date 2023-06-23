import { fontMono, fontSans } from '@/lib/fonts'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import * as React from 'react'

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
	<NextThemesProvider {...props}>
		<style>{`
			:root {
				--font-sans: ${fontSans.style.fontFamily};
				--font-mono: ${fontMono.style.fontFamily};
			}
		`}</style>

		{children}
	</NextThemesProvider>
)
