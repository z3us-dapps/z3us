import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from 'ui/src/theme'
import { CssBaseline } from '@nextui-org/react'

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
					<style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
					{CssBaseline.flush()}
					<meta name="google-site-verification" content="QkTxhXd8lbcv8uLrhOetT8bSP3Fx0N4ogMI30FxYSMg" />
					<link rel="preload" href="/fonts/CentraNo1-Bold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
					<link rel="preload" href="/fonts/CentraNo1-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
					<link
						rel="preload"
						href="/fonts/HaasGrotDispRound-75Bold-Web.woff"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="/fonts/HaasGrotDispRound-75Bold-Web.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="/fonts/HaasGrotTextRound-55Roman-Web.woff"
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
						href="/fonts/HaasGrotTextRound-65Medium-Web.woff"
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
						href="/fonts/HaasGrotTextRound-75Bold-Web.woff"
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
						dangerouslySetInnerHTML={{
							__html: `
@font-face {
	font-family: 'Centra-Web';
	src: url('/fonts/CentraNo1-Bold.woff2') format('woff2'), url('/fonts/CentraNo1-Bold.woff') format('woff');
	font-weight: 700;
	font-style: normal;
  font-display: swap;
}

@font-face {
	font-family: 'HaasGrotTextRound-Web';
	src: url('/fonts/HaasGrotTextRound-75Bold-Web.woff2') format('woff2'),
		url('/fonts/HaasGrotTextRound-75Bold-Web.woff') format('woff');
	font-weight: 700;
	font-style: normal;
  font-display: swap;
}

@font-face {
	font-family: 'HaasGrotTextRound-Web';
	src: url('/fonts/HaasGrotTextRound-65Medium-Web.woff2') format('woff2'),
		url('/fonts/HaasGrotTextRound-65Medium-Web.woff') format('woff');
	font-weight: 500;
  font-display: swap;
	font-style: normal;
}

@font-face {
	font-family: 'HaasGrotTextRound-Web';
	src: url('/fonts/HaasGrotTextRound-55Roman-Web.woff2') format('woff2'),
		url('/fonts/HaasGrotTextRound-55Roman-Web.woff') format('woff');
	font-weight: 400;
  font-display: swap;
	font-style: normal;
}

@font-face {
	font-family: 'HaasGrotDispRound-Web';
	src: url('/fonts/HaasGrotDispRound-75Bold-Web.woff2') format('woff2'),
		url('/fonts/HaasGrotDispRound-75Bold-Web.woff') format('woff');
	font-weight: 700;
  font-display: swap;
	font-style: normal;
}
`,
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
