import React from 'react'
import { useMatches } from 'react-router-dom'

import { Box } from 'ui/src/components/box'

import * as styles from './styles.css'

export const Breadcrumbs: React.FC = () => {
	const matches = useMatches()
	const validCrumbs = matches.filter(match => Boolean((match.handle as any)?.crumb))
	const crumbs = validCrumbs.map((match, idx) =>
		(match.handle as any).crumb(match.params, idx === validCrumbs.length - 1),
	)

	return (
		<Box className={styles.accountBreadCrumbWrapper}>
			{crumbs.map((crumb, index) => (
				// eslint-disable-next-line react/no-array-index-key
				<React.Fragment key={index}>{crumb}</React.Fragment>
			))}
		</Box>
	)
}
