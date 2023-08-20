import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ChevronRightIcon } from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'
import { Text } from 'ui/src/components/typography'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import * as styles from './styles.css'

export const AssetsBreadcrumb: React.FC = () => {
	const location = useLocation()
	const pathSegments = location.pathname.split('/').filter(segment => segment)
	const isHomeAccounts = pathSegments[1] === '-'
	const accounts = useWalletAccounts()

	const lookupSegmentName = (segment: string) => {
		const accountName = accounts?.[segment]?.name

		if (accountName) {
			return accountName
		}

		if (segment === 'fungibles') {
			return 'Tokens'
		}

		if (segment === 'non-fungibles') {
			return 'Nfts'
		}

		return segment
	}

	const renderBreadCrumb = () =>
		pathSegments.map((segment, index) => {
			const path = `/${pathSegments.slice(0, index + 1).join('/')}`
			const segmentName = lookupSegmentName(segment)
			const capitalizedSegmentName = capitalizeFirstLetter(segmentName)
			const isLastSegment = index === pathSegments.length - 1
			return (
				<React.Fragment key={path}>
					{index !== 0 && <ChevronRightIcon />}
					{isLastSegment ? (
						<Text>{capitalizedSegmentName}</Text>
					) : (
						<Link underline="hover" to={path}>
							{capitalizedSegmentName}
						</Link>
					)}
				</React.Fragment>
			)
		})

	return (
		<Box className={styles.accountBreadCrumbWrapper}>{isHomeAccounts ? <Text>Accounts</Text> : renderBreadCrumb()}</Box>
	)
}
