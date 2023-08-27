import React from 'react'
import { useMatches } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ChevronRightIcon } from 'ui/src/components/icons'

import * as styles from './styles.css'

export const Breadcrumbs: React.FC = () => {
	const matches = useMatches()
	const crumbs = matches
		.filter(match => Boolean((match.handle as any)?.crumb))
		.map(match => (match.handle as any).crumb(match.params))

	return (
		<Box className={styles.accountBreadCrumbWrapper}>
			{crumbs.map((crumb, index) => (
				// eslint-disable-next-line react/no-array-index-key
				<React.Fragment key={index}>
					{index !== 0 && <ChevronRightIcon />}
					{crumb}
				</React.Fragment>
			))}
		</Box>
	)
}
