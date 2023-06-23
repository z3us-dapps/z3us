/* eslint-disable react/function-component-definition */
import { Head, Html, Main, NextScript } from 'next/document'

import { lightThemeClass } from 'ui/src/components/system/theme.css'

export default function Document() {
	return (
		<Html lang="en" className={lightThemeClass}>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
