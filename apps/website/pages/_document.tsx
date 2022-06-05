import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from 'ui/src/theme'

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
					<style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
					<link rel="preload" href="/fonts/FiraSans-Bold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
					<link rel="preload" href="/fonts/FiraSans-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
					<link rel="preload" href="/fonts/FiraSans-Medium.woff" as="font" type="font/woff" crossOrigin="anonymous" />
					<link rel="preload" href="/fonts/FiraSans-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
					<link rel="preload" href="/fonts/FiraSans-Regular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
					<link
						rel="preload"
						href="/fonts/FiraSans-Regular.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link rel="preload" href="/fonts/Montserrat-Bold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
					<link rel="preload" href="/fonts/Montserrat-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
					<link rel="preload" href="/fonts/Montserrat-Medium.woff" as="font" type="font/woff" crossOrigin="anonymous" />
					<link
						rel="preload"
						href="/fonts/Montserrat-Medium.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="/fonts/Montserrat-Regular.woff"
						as="font"
						type="font/woff"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="/fonts/Montserrat-Regular.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
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
:root {
  --fg: #000;
  --bg: #fff;
}

[data-theme='dark'] {
  --fg: #fff;
  --bg: #161718;
}

body {
  background: var(--bg);
  color: var(--fg);
}

html,
body {
  padding: 0;
  margin: 0;
}

@font-face {
  font-family: 'Montserrat';
  font-weight: 400;
  font-display: swap;
  src: url(/fonts/Montserrat-Regular.woff2) format('woff2'), url(/fonts/Montserrat-Regular.woff) format('woff');
}
@font-face {
  font-family: 'Montserrat';
  font-weight: 500;
  font-display: swap;
  src: url(/fonts/Montserrat-Medium.woff2) format('woff2'), url(/fonts/Montserrat-Medium.woff) format('woff');
}
@font-face {
  font-family: 'Montserrat';
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/Montserrat-Bold.woff2') format('woff2'), url('/fonts/Montserrat-Bold.woff') format('woff');
}
@font-face {
  font-family: 'Fira Sans';
  font-weight: 400;
  font-display: swap;
  src: url(/fonts/FiraSans-Regular.woff2) format('woff2'), url(/fonts/FiraSans-Regular.woff) format('woff');
}
@font-face {
  font-family: 'Fira Sans';
  font-weight: 500;
  font-display: swap;
  src: url(/fonts/FiraSans-Medium.woff2) format('woff2'), url(/fonts/FiraSans-Medium.woff) format('woff');
}
@font-face {
  font-family: 'Fira Sans';
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/FiraSans-Bold.woff2') format('woff2'), url('/fonts/FiraSans-Bold.woff') format('woff');
}
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
