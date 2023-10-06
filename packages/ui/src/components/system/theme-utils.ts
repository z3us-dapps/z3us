import type { GlobalStyleRule, StyleRule } from '@vanilla-extract/css'
import { globalStyle } from '@vanilla-extract/css'
import type { Properties, SimplePseudos } from 'csstype'
import isEqual from 'lodash/isEqual'
import mapValues from 'lodash/mapValues'
import omit from 'lodash/omit'

import { darkMode } from './sprinkles.css'

export const breakpoints = {
	mobile: 0,
	tablet: 768,
	desktop: 1024,
}

export type Breakpoint = keyof typeof breakpoints

export const queries = mapValues(omit(breakpoints, 'mobile'), bp => `screen and (min-width: ${bp}px)`)

const makeMediaQuery = (breakpoint: keyof typeof queries) => (styles: Properties<string | number>) =>
	!styles || Object.keys(styles).length === 0
		? {}
		: {
				[queries[breakpoint]]: styles,
		  }

const mediaQuery = {
	tablet: makeMediaQuery('tablet'),
	desktop: makeMediaQuery('desktop'),
}

type CSSProps = Properties<string | number> & {
	[P in SimplePseudos]?: Properties<string | number>
}

interface ResponsiveStyle {
	mobile?: CSSProps
	tablet?: CSSProps
	desktop?: CSSProps
}

export const responsiveStyle = ({ mobile, tablet, desktop }: ResponsiveStyle): StyleRule => {
	const mobileStyles = omit(mobile, '@media')

	const tabletStyles = !tablet || isEqual(tablet, mobileStyles) ? null : tablet

	const stylesBelowDesktop = tabletStyles || mobileStyles
	const desktopStyles = !desktop || isEqual(desktop, stylesBelowDesktop) ? null : desktop

	const hasMediaQueries = tabletStyles || desktopStyles

	return {
		...mobileStyles,
		...(hasMediaQueries
			? {
					'@media': {
						...(tabletStyles ? mediaQuery.tablet(tabletStyles) : {}),
						...(desktopStyles ? mediaQuery.desktop(desktopStyles) : {}),
					},
			  }
			: {}),
	}
}

export const mapToProperty =
	<Property extends keyof Properties<string | number>>(property: Property, breakpoint?: Breakpoint) =>
	(value: string | number) => {
		const styleRule = { [property]: value }

		return breakpoint ? responsiveStyle({ [breakpoint]: styleRule }) : styleRule
	}

export const recipeGlobalStyle = (
	recipeSelector: string,
	selector: string,
	rule: GlobalStyleRule,
	isDarkMode?: boolean,
): void => globalStyle(`${isDarkMode ? `.${darkMode}` : ''} ${recipeSelector.split(' ')[1]} ${selector}`, rule)

export const recipeResponsiveGlobalStyle = (
	recipeSelector: string,
	selector: string,
	rule: ResponsiveStyle,
	isDarkMode?: boolean,
): void => {
	globalStyle(`${isDarkMode ? `.${darkMode}` : ''} ${recipeSelector.split(' ')[1]} ${selector}`, responsiveStyle(rule))
}
