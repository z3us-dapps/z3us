import { createTextStyle } from '@capsizecss/vanilla-extract'
import { style, styleVariants } from '@vanilla-extract/css'
import { mapToProperty, queries, responsiveStyle } from '../system/theme-utils'
import { sprinkles } from '../system/sprinkles.css'
import { vars } from '../system/theme.css'

export const baseTextSprinkles = sprinkles({
	transition: 'fast',
})

const makeTypographyRules = (textDefinition: typeof vars.text.medium) => {
	const { fontSize: mobileFontSize, lineHeight: mobileLineHeight } = textDefinition.mobile

	const { fontSize: tabletFontSize, lineHeight: tabletLineHeight } = textDefinition.tablet

	const { fontSize: desktopFontSize, lineHeight: desktopLineHeight } = textDefinition.desktop

	return {
		untrimmed: style(
			responsiveStyle({
				mobile: {
					fontSize: mobileFontSize,
					lineHeight: mobileLineHeight,
				},
				tablet: {
					fontSize: tabletFontSize,
					lineHeight: tabletLineHeight,
				},
				desktop: {
					fontSize: desktopFontSize,
					lineHeight: desktopLineHeight,
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
	code: makeTypographyRules(vars.text.code),
	xsmall: makeTypographyRules(vars.text.xsmall),
	small: makeTypographyRules(vars.text.small),
	medium: makeTypographyRules(vars.text.medium),
	large: makeTypographyRules(vars.text.large),
	xlarge: makeTypographyRules(vars.text.xlarge),
	xxlarge: makeTypographyRules(vars.text.xxlarge),
	xxxlarge: makeTypographyRules(vars.text.xxxlarge),
}
