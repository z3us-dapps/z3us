import { JetBrains_Mono as FontMono, Inter as FontSans } from 'next/font/google'

export const fontSans = FontSans({
	// weight: '400',
	subsets: ['latin'],
	variable: '--font-sans',
})

export const fontMono = FontMono({
	// weight: '400',
	subsets: ['latin'],
	variable: '--font-mono',
})
