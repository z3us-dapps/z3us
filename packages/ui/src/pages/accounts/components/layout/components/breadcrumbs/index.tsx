import React from 'react'
import { useMatches } from 'react-router-dom'

import { Box } from 'ui/src/components/box'

import * as styles from './styles.css'

export const Breadcrumbs: React.FC = () => {
	const matches = useMatches()
	const validCrumbs = matches.filter(match => Boolean((match.handle as any)?.crumb))

	return (
		<Box className={styles.accountBreadCrumbContainerWrapper}>
			<Box className={styles.accountBreadCrumbWrapper}>
				{validCrumbs.map((match, idx) => (
					<Box className={styles.accountBreadCrumb} key={match.id}>
						{(match.handle as any).crumb(match.params, idx === validCrumbs.length - 1)}
					</Box>
				))}
			</Box>
		</Box>
	)
}
