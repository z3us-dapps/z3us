import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { getPageClassName } from 'hooks/use-body-class'

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
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
`,
						}}
					/>
				</Head>
				<body
					className={`font-HaasGrotTextRound text-base bg-white dark:bg-black text-black dark:text-white ${getPageClassName(
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
