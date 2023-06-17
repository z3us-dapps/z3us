/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

import { lightThemeClass } from 'ui/src/components-v2/system/theme.css'

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
