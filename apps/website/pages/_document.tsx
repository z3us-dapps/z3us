import { getPageClassName } from 'hooks/use-body-class'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

import { getCssText } from 'ui/src/theme'

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
					{/* eslint-disable-next-line react/no-danger */}
					<style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
					<link
						rel="preload"
						href="/fonts/HaasGrotDispRound-75Bold-Web.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="/fonts/HaasGrotTextRound-55Roman-Web.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="/fonts/HaasGrotTextRound-65Medium-Web.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="/fonts/HaasGrotTextRound-75Bold-Web.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<style
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{
							__html: `
html,
body {
  padding: 0;
  margin: 0;
}

@font-face {
	font-family: 'HaasGrotTextRound-Web';
	src: url('/fonts/HaasGrotTextRound-75Bold-Web.woff2') format('woff2');
	font-weight: 700;
	font-style: normal;
  font-display: swap;
}

@font-face {
	font-family: 'HaasGrotTextRound-Web';
	src: url('/fonts/HaasGrotTextRound-65Medium-Web.woff2') format('woff2');
	font-weight: 500;
  font-display: swap;
	font-style: normal;
}

@font-face {
	font-family: 'HaasGrotTextRound-Web';
	src: url('/fonts/HaasGrotTextRound-55Roman-Web.woff2') format('woff2');
	font-weight: 400;
  font-display: swap;
	font-style: normal;
}

@font-face {
	font-family: 'HaasGrotDispRound-Web';
	src: url('/fonts/HaasGrotDispRound-75Bold-Web.woff2') format('woff2');
	font-weight: 700;
  font-display: swap;
	font-style: normal;
}

@font-face {
	font-family: 'Inter';
	font-weight: 400;
	font-display: swap;
	src: url('/fonts/Inter-Regular.woff2') format('woff2'), url('/fonts/Inter-Regular.woff') format('woff');
}
@font-face {
	font-family: 'Inter';
	font-weight: 500;
	font-display: swap;
	src: url('/fonts/Inter-Medium.woff2') format('woff2'), url('/fonts/Inter-Medium.woff') format('woff');
}
@font-face {
	font-family: 'Inter';
	font-weight: 700;
	font-display: swap;
	src: url('/fonts/Inter-Bold.woff2') format('woff2'), url('/fonts/Inter-Bold.woff') format('woff');
}
`,
						}}
					/>
				</Head>
				<body
					className={`font-Inter text-base ${getPageClassName(
						// eslint-disable-next-line no-underscore-dangle
						this.props.__NEXT_DATA__.page,
					)}`}
				>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
