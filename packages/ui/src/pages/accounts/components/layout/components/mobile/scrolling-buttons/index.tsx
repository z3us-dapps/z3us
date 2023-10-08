import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { useIntersectionObserver } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { ChevronDown3Icon, ChevronLeftIcon, Close2Icon, SearchIcon } from 'ui/src/components/icons'
import { Input } from 'ui/src/components/input'
import { Button } from 'ui/src/components/router-button'
import { Link } from 'ui/src/components/router-link'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'
import { getStringMetadata } from 'ui/src/services/metadata'

import * as styles from './styles.css'
import { useShowActivitiesParam } from './use-show-activities-param'

const messages = defineMessages({
	assets: {
		id: 'mobile.menu.assets',
		defaultMessage: 'Assets',
	},
	tokens: {
		id: 'mobile.menu.tokens',
		defaultMessage: 'Tokens {symbol}',
	},
	nfts: {
		id: 'mobile.menu.nfts',
		defaultMessage: 'NFTs',
	},
	activity: {
		id: 'mobile.menu.activity',
		defaultMessage: 'Activity',
	},
	back: {
		id: 'mobile.menu.back',
		defaultMessage: 'Back',
	},
	clear: {
		id: 'mobile.menu.clear',
		defaultMessage: 'Clear',
	},
	search: {
		id: 'mobile.menu.search',
		defaultMessage: 'Search...',
	},
})

const TabTitle: React.FC = () => {
	const intl = useIntl()
	const { resourceId } = useParams()
	const resourceType = useResourceType()
	const { data } = useEntityMetadata(resourceId)

	const name = getStringMetadata('name', data)
	const symbol = getStringMetadata('symbol', data) || name

	switch (resourceType) {
		case 'tokens':
			return <>{intl.formatMessage(messages.tokens, { symbol: symbol ? ` (${symbol.toUpperCase()})` : '' })}</>
		case 'nfts':
			return <>{intl.formatMessage(messages.nfts)}</>
		default:
			return <>{intl.formatMessage(messages.assets)}</>
	}
}

export interface IProps {
	className: string
}

export const MobileScrollingButtons: React.FC<IProps> = ({ className }) => {
	const intl = useIntl()
	const { scrollableNode } = useScroll()
	const { accountId = '-', resourceId } = useParams()

	const resourceType = useResourceType()
	const showActivities = useShowActivitiesParam()
	const wrapperRef = useRef(null)
	const [isSticky, setIsSticky] = useState<boolean>(false)
	const stickyRef = useRef(null)
	const entry = useIntersectionObserver(stickyRef, { threshold: [1] })
	const { assetType } = useParams()

	const onClickChevron = () => {
		if (isSticky) {
			scrollableNode.scrollTo({ top: 0, behavior: 'smooth' })
		} else {
			const HEADER_SPACE = 58
			const bounding = wrapperRef.current.getBoundingClientRect()
			scrollableNode.scrollTo({ top: bounding.top - HEADER_SPACE, behavior: 'smooth' })
		}
	}

	const generateAccountLink = (isActivity = false) =>
		`/accounts/${accountId}/${resourceType ? `${resourceType}/` : ''}${resourceId ? `${resourceId}/` : ''}${
			isActivity ? `?acts=true` : ''
		}`

	const generateBackLink = () => `/accounts`

	useEffect(() => {
		setIsSticky(!entry?.isIntersecting)
	}, [entry?.isIntersecting])

	return (
		<Box
			ref={wrapperRef}
			className={clsx(
				styles.accountRoutesScrollingStickyBtnWrapper,
				isSticky && styles.accountRoutesScrollingStickyShadow,
				className,
			)}
		>
			<Box ref={stickyRef} className={styles.accountRoutesScrollingStickyElem} />
			<Box className={styles.accountRoutesScrollingStickyBtnInner}>
				<Box className={styles.tabsWrapper}>
					<Link
						underline="never"
						to={generateAccountLink()}
						className={clsx(
							styles.tabsWrapperButton,
							styles.tabsWrapperButtonLeft,
							!showActivities && styles.tabsWrapperButtonActive,
							isSticky && styles.tabsWrapperButtonSticky,
						)}
					>
						<Text size="medium" weight="strong" align="center" color={!showActivities ? 'strong' : 'neutral'}>
							<TabTitle />
						</Text>
					</Link>
					<Link
						underline="never"
						to={generateAccountLink(true)}
						className={clsx(
							styles.tabsWrapperButton,
							styles.tabsWrapperButtonRight,
							showActivities && styles.tabsWrapperButtonActive,
							isSticky && styles.tabsWrapperButtonSticky,
						)}
					>
						<Text size="small" weight="strong" align="center" color={showActivities ? 'strong' : 'neutral'}>
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
				<Box className={styles.searchWrapper}>
					{assetType ? (
						<ToolTip message={intl.formatMessage(messages.back)}>
							<Button to={generateBackLink()} iconOnly styleVariant="ghost" sizeVariant="small" rounded>
								<ChevronLeftIcon />
							</Button>
						</ToolTip>
					) : null}
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
							showActivities ? (
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
				</Box>
			</Box>
		</Box>
	)
}
