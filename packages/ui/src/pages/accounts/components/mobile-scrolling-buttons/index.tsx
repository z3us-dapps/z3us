import clsx from 'clsx'
import { useScroll } from 'packages/ui/src/components/scroll-area-radix/use-scroll'
import { useEntityMetadata, useMetadataValue } from 'packages/ui/src/hooks/dapp/use-entity-metadata'
import { useResourceType } from 'packages/ui/src/pages/accounts/hooks/use-resource-type'
import { useShowActivitiesParam } from 'packages/ui/src/pages/accounts/hooks/use-show-activities-param'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useIntersectionObserver } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { ChevronDown3Icon, ChevronLeftIcon, Close2Icon, SearchIcon } from 'ui/src/components/icons'
import { Input } from 'ui/src/components/input'
import { Button } from 'ui/src/components/router-button'
import { Link } from 'ui/src/components/router-link'
import { ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import * as styles from './mobile-scrolling-button.css'

const TabTitle: React.FC = () => {
	const { resourceId } = useParams()
	const resourceType = useResourceType()
	const { data } = useEntityMetadata(resourceId)

	const name = useMetadataValue('name', data)
	const symbol = useMetadataValue('symbol', data) || name

	switch (resourceType) {
		case 'fungibles':
			return (
				<>
					{/* TODO: if the asset is XRD, should say `coin` not `token`  */}
					<Translation capitalizeFirstLetter text="accounts.home.assetsTokens" />
					{symbol ? ` (${symbol.toUpperCase()})` : ''}
				</>
			)
		case 'non-fungibles':
			return <Translation capitalizeFirstLetter text="accounts.home.assetsNfts" />
		default:
			return <Translation capitalizeFirstLetter text="global.assets" />
	}
}

export const MobileScrollingButtons: React.FC = () => {
	const { scrollableNode } = useScroll()
	const { accountId, resourceId } = useParams()
	const resourceType = useResourceType()
	const showActivities = useShowActivitiesParam()
	const wrapperRef = useRef(null)
	const stickyRef = useRef(null)
	const entry = useIntersectionObserver(stickyRef, { threshold: [1] })
	const isSticky = !entry?.isIntersecting
	const isVerticalScrollable = scrollableNode?.scrollHeight > scrollableNode?.clientHeight
	const { assetType } = useParams()
	const { t } = useTranslation()

	const onClickChevron = () => {
		if (isSticky) {
			scrollableNode.scrollTo({ top: 0, behavior: 'smooth' })
		} else {
			const HEADER_SPACE = 58
			const bounding = wrapperRef.current.getBoundingClientRect()
			scrollableNode.scrollTo({ top: bounding.top - HEADER_SPACE, behavior: 'smooth' })
		}
	}

	const generateAccountLink = (isActivity = false, generateAssetLink = false) =>
		!generateAssetLink
			? `/accounts/${accountId}${isActivity ? `?activity=true` : ''}`
			: `/accounts/${accountId}/${resourceType}/${resourceId}${isActivity ? `?show-activities=true` : ''}`

	const generateBackLink = () => `/accounts`

	return (
		<Box
			ref={wrapperRef}
			className={clsx(
				styles.accountRoutesScrollingStickyBtnWrapper,
				isSticky && styles.accountRoutesScrollingStickyShadow,
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
						)}
					>
						<Text size="medium" weight="strong" align="center" color={!showActivities ? 'strong' : 'neutral'}>
							<TabTitle />
						</Text>
					</Link>
					<Link
						underline="never"
						to={generateAccountLink(true, true)}
						className={clsx(
							styles.tabsWrapperButton,
							styles.tabsWrapperButtonRight,
							showActivities && styles.tabsWrapperButtonActive,
						)}
					>
						<Text size="medium" weight="strong" align="center" color={showActivities ? 'strong' : 'neutral'}>
							<Translation capitalizeFirstLetter text="global.activity" />
						</Text>
					</Link>
					<Button
						styleVariant="ghost"
						sizeVariant="small"
						iconOnly
						className={clsx(
							styles.tabsWrapperScrollBtn,
							isSticky && styles.tabsWrapperScrollBtnScrolled,
							!isVerticalScrollable && styles.tabsWrapperScrollBtnHidden,
						)}
						onClick={onClickChevron}
					>
						<ChevronDown3Icon />
					</Button>
				</Box>
				<Box className={styles.searchWrapper}>
					{assetType ? (
						<ToolTip message="global.back">
							<Button to={generateBackLink()} iconOnly styleVariant="ghost" sizeVariant="small" rounded>
								<ChevronLeftIcon />
							</Button>
						</ToolTip>
					) : null}
					<Input
						sizeVariant="small"
						className={styles.inputSearch}
						value=""
						placeholder={capitalizeFirstLetter(t('global.search'))}
						rounded
						leftIcon={
							<Box paddingLeft="small" display="flex" alignItems="center">
								<SearchIcon />
							</Box>
						}
						rightIcon={
							showActivities ? (
								<ToolTip message="global.clear">
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
