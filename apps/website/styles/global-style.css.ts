import { globalStyle } from "@vanilla-extract/css";

globalStyle("html, body", {
	height: "100%",
	margin: 0,
});

globalStyle("*, *::before, *::after", {
	boxSizing: "border-box",
	margin: 0,
	padding: 0,
	WebkitFontSmoothing: "antialiased",
	MozOsxFontSmoothing: "grayscale",
});

globalStyle("body", {
	display: "flex",
	flexDirection: "column",
	margin: "0",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
	background: "#000",
	color: "#fff",
});

globalStyle("::selection", {
	background: "#BF40BF",
	color: "#fff",
	// background: vars.color.purple500,
	// color: vars.color.white,
});

globalStyle("h1, h2, h3, h4, p", {
	margin: 0,
});

globalStyle("main", {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
	position: "relative",
	width: "100%",
	height: "100%",
	maxWidth: "720px",
	margin: "0 auto",
});

globalStyle("*, *::before, *::after", {
	boxSizing: "border-box",
	margin: 0,
	padding: 0,
});

// globalStyle('body', {
// 	textRendering: 'optimizeLegibility',
// 	fontFamily: vars.fonts.body,
// })

// globalStyle(`body.${darkMode}`, {
// 	colorScheme: 'dark',
// })
