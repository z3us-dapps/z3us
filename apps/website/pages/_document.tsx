import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

import { lightThemeClass } from 'ui/src/components/system/theme.css'

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
