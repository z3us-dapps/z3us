import { style, globalStyle } from "@vanilla-extract/css";

globalStyle(".test-class-wrapper", {
	margin: 0,
	border: "1px solid red",
});

globalStyle(".test-class-wrapper button", {
	margin: 0,
	border: "1px solid blue",
});

globalStyle("::slotted(radix-connect-button)", {
	margin: 0,
	border: "1px solid yellow",
});

globalStyle(".test-class-rdx-btn", {
	margin: 0,
	border: "1px solid red",
});

globalStyle("radix-button", {
	margin: 0,
	border: "1px solid yellow",
});

export const page = style({
	display: "block",
	gap: "1em",
	placeContent: "center",
});

export const buttonStyled = style({
	display: "block",
	border: "1px solid red",
});

export const radixButtonWrapper = style({
	display: "flex",
	paddingTop: "10px",
	gap: "1em",
	justifyContent: "flex-end",
	height: "70px",
});

export const routesWrapper = style({
	display: "block",
});
