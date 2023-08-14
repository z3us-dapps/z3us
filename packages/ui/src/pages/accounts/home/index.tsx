import clsx from 'clsx'
import { useScroll } from 'packages/ui/src/components/scroll-area-radix/use-scroll'
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import * as tableHeadStyles from 'ui/src/components/styles/table-head-shadow.css'

import { AssetsHeader } from '../components/assets-header'
import { MobileScrollingBackground } from '../components/mobile-scrolling-background'
import { MobileScrollingButtons } from '../components/mobile-scrolling-buttons'
import * as styles from './styles.css'

const Home: React.FC = () => {
	const { scrollableNode, isScrolledTop } = useScroll()
	const { accountId = '-' } = useParams()

	return (
		<Box className={clsx(styles.accountRoutesWrapper, !isScrolledTop && tableHeadStyles.accountTheadShadow)}>
			<Box className={styles.accountRoutesScrollingWrapper}>
				<MobileScrollingBackground scrollableNode={scrollableNode} />
				<MobileScrollingButtons scrollableNode={scrollableNode} />
				<AssetsHeader isScrolledTop={isScrolledTop} scrollableNode={scrollableNode} />
				<Box className={styles.assetsTableWrapper}>
					<ul>
						<NavLink to={`/accounts/${accountId}/fungibles`} end>
							{({ isActive }) => <li>Fungibles {isActive ? '(active)' : ''}</li>}
						</NavLink>
						<NavLink to={`/accounts/${accountId}/non-fungibles`} end>
							{({ isActive }) => <li>Non-Fungibles {isActive ? '(active)' : ''}</li>}
						</NavLink>
					</ul>
				</Box>
			</Box>
		</Box>
	)
}

export default Home
