import { Head, Html, Main, NextScript } from 'next/document'

import { lightThemeClass } from 'ui/src/theme/theme.css'

// eslint-disable-next-line react/function-component-definition
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
