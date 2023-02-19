import { createTextStyle } from '@capsizecss/vanilla-extract'
import { style, styleVariants } from '@vanilla-extract/css'
import { mapToProperty, queries, responsiveStyle } from '../system/theme-utils'
import { sprinkles } from '../system/sprinkles.css'
import { vars } from '../system/theme.css'

export const baseTextSprinkles = sprinkles({})

// @TODO: spacing properly
// const makeTypographyRules = (textDefinition: typeof vars.text.medium, textSpacingDefinition: any) => {
const makeTypographyRules = (textDefinition: any, textSpacingDefinition: any) => {
	const { fontSize: mobileFontSize, lineHeight: mobileLineHeight } = textDefinition.mobile
	const { fontSize: tabletFontSize, lineHeight: tabletLineHeight } = textDefinition.tablet
	const { fontSize: desktopFontSize, lineHeight: desktopLineHeight } = textDefinition.desktop
	const {
		mobile: mobileLetterSpacing,
		tablet: tabletLetterSpacing,
		desktop: desktopLetterSpacing,
	} = textSpacingDefinition

	return {
		untrimmed: style(
			responsiveStyle({
				mobile: {
					fontSize: mobileFontSize,
					lineHeight: mobileLineHeight,
					letterSpacing: mobileLetterSpacing,
				},
				tablet: {
					fontSize: tabletFontSize,
					lineHeight: tabletLineHeight,
					letterSpacing: tabletLetterSpacing,
				},
				desktop: {
					fontSize: desktopFontSize,
					lineHeight: desktopLineHeight,
					letterSpacing: desktopLetterSpacing,
				},
			}),
		),
		trimmed: createTextStyle(textDefinition.mobile, {
			'@media': {
				[queries.tablet]: textDefinition.tablet,
				[queries.desktop]: textDefinition.desktop,
			},
		}),
	}
}

export const font = styleVariants(vars.fonts, mapToProperty('fontFamily'))
export const weight = styleVariants(vars.weight, mapToProperty('fontWeight'))

export const text = {
	code: makeTypographyRules(vars.text.code.calculate, vars.text.code.spacing),
	xxsmall: makeTypographyRules(vars.text.xxsmall.calculate, vars.text.xxsmall.spacing),
	xsmall: makeTypographyRules(vars.text.xsmall.calculate, vars.text.xsmall.spacing),
	small: makeTypographyRules(vars.text.small.calculate, vars.text.small.spacing),
	medium: makeTypographyRules(vars.text.medium.calculate, vars.text.medium.spacing),
	large: makeTypographyRules(vars.text.large.calculate, vars.text.large.spacing),
	xlarge: makeTypographyRules(vars.text.xlarge.calculate, vars.text.xlarge.spacing),
	xxlarge: makeTypographyRules(vars.text.xxlarge.calculate, vars.text.xxlarge.spacing),
	xxxlarge: makeTypographyRules(vars.text.xxxlarge.calculate, vars.text.xxxlarge.spacing),
}
