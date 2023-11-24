import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useIntersectionObserver } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { ChevronDown3Icon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { Link } from 'ui/src/components/router-link'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { Text } from 'ui/src/components/typography'
import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { useIsActivitiesVisible } from 'ui/src/pages/accounts/hooks/use-is-activities-visible'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'
import { findMetadataValue } from 'ui/src/services/metadata'

import * as styles from './styles.css'

const messages = defineMessages({
	assets: {
		id: 'd1uESJ',
		defaultMessage: 'Assets',
	},
	tokens: {
		id: 'iyKLWv',
		defaultMessage: 'Tokens {symbol}',
	},
	nfts: {
		id: 'nqRscq',
		defaultMessage: 'NFTs',
	},
	activity: {
		id: 'ZmlNQ3',
		defaultMessage: 'Activity',
	},
	back: {
		id: 'cyR7Kh',
		defaultMessage: 'Back',
	},
	clear: {
		id: '/GCoTA',
		defaultMessage: 'Clear',
	},
	search: {
		id: '0BUTMv',
		defaultMessage: 'Search...',
	},
})

const TabTitle: React.FC = () => {
	const intl = useIntl()
	const { resourceId } = useParams()
	const resourceType = useResourceType()

	const { data } = useEntityMetadata(resourceId)

	const name = findMetadataValue('name', data)
	const symbol = findMetadataValue('symbol', data) || name

	switch (resourceType) {
		case 'tokens':
			return <>{intl.formatMessage(messages.tokens, { symbol: symbol ? ` (${symbol.toUpperCase()})` : '' })}</>
		case 'nfts':
			return <>{intl.formatMessage(messages.nfts)}</>
		default:
			return <>{intl.formatMessage(messages.assets)}</>
	}
}

const HEADER_SPACE = 278
const scrollToTop: ScrollToOptions = { top: 0, behavior: 'instant' as ScrollBehavior }
const scrollToHeader: ScrollToOptions = { top: HEADER_SPACE, behavior: 'instant' as ScrollBehavior }

export const MobileScrollingButtons: React.FC = () => {
	const intl = useIntl()
	const location = useLocation()
	const [searchParams] = useSearchParams()
	const { scrollableNode } = useScroll()
	const wrapperRef = useRef(null)
	const stickyRef = useRef(null)
	const [isSticky, setIsSticky] = useState<boolean>(false)
	const isActivitiesVisible = useIsActivitiesVisible()
	const entry = useIntersectionObserver(stickyRef, { threshold: [1] })

	const queryWithActs = new URLSearchParams(searchParams)
	queryWithActs.set('acts', `true`)
	const queryWithoutActs = new URLSearchParams(searchParams)
	queryWithoutActs.delete('acts')

	const onClickChevron = () => {
		scrollableNode.scrollTo(isSticky ? scrollToTop : scrollToHeader)
	}

	useEffect(() => {
		setIsSticky(!entry?.isIntersecting)
	}, [entry?.isIntersecting])

	return (
		<Box
			ref={wrapperRef}
			className={clsx(
				styles.accountRoutesScrollingStickyBtnWrapper,
				isSticky && styles.accountRoutesScrollingStickyShadow,
				styles.accountRoutesScrollingStickyBtnCollectionWrapper,
			)}
		>
			<Box ref={stickyRef} className={styles.accountRoutesScrollingStickyElem} />
			<Box className={styles.accountRoutesScrollingStickyBtnInner}>
				<Box className={styles.tabsWrapper}>
					<Link
						underline="never"
						to={`${location.pathname}?${queryWithoutActs}`}
						className={clsx(
							styles.tabsWrapperButton,
							styles.tabsWrapperButtonLeft,
							!isActivitiesVisible && styles.tabsWrapperButtonActive,
							isSticky && styles.tabsWrapperButtonSticky,
						)}
					>
						<Text size="medium" weight="strong" align="center" color={!isActivitiesVisible ? 'strong' : 'neutral'}>
							<TabTitle />
						</Text>
					</Link>
					<Link
						underline="never"
						to={`${location.pathname}?${queryWithActs}`}
						className={clsx(
							styles.tabsWrapperButton,
							styles.tabsWrapperButtonRight,
							isActivitiesVisible && styles.tabsWrapperButtonActive,
							isSticky && styles.tabsWrapperButtonSticky,
						)}
					>
						<Text size="small" weight="strong" align="center" color={isActivitiesVisible ? 'strong' : 'neutral'}>
							{intl.formatMessage(messages.activity)}
						</Text>
					</Link>
					<Button
						styleVariant="ghost"
						sizeVariant="small"
						iconOnly
						className={clsx(styles.tabsWrapperScrollBtn, isSticky && styles.tabsWrapperScrollBtnScrolled)}
						onClick={onClickChevron}
					>
						<ChevronDown3Icon />
					</Button>
				</Box>
				{/* TODO: search  */}
				{/* <Box className={styles.searchWrapper}>
					<Input
						sizeVariant="small"
						styleVariant="secondary"
						className={styles.inputSearch}
						value=""
						placeholder={intl.formatMessage(messages.search)}
						rounded
						leftIcon={
							<Box paddingLeft="small" display="flex" alignItems="center">
								<SearchIcon />
							</Box>
						}
						rightIcon={
							// eslint-disable-next-line no-constant-condition
							false ? (
								<ToolTip message={intl.formatMessage(messages.clear)}>
									<Button iconOnly sizeVariant="small" styleVariant="ghost" rounded>
										<Close2Icon />
									</Button>
								</ToolTip>
							) : null
						}
						rightIconClassName={styles.inputSearchClearBtn}
						onChange={() => {}}
					/>
				</Box> */}
			</Box>
		</Box>
	)
}
