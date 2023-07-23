/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useIntersectionObserver, useTimeout } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ChevronDown3Icon } from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import {
	ACCOUNTS_ALL,
	ASSET_TYPE_NFTS,
	ASSET_TYPE_TOKENS,
	SEARCH_ACTIVITY_PARAM,
	routes,
} from 'ui/src/constants/routes'
import { useAccountParams } from 'ui/src/hooks/use-account-params'

import * as styles from './mobile-scrolling-button.css'

interface IMobileScrollingButtonsProps {
	scrollableNode: HTMLElement
}

export const MobileScrollingButtons: React.FC<IMobileScrollingButtonsProps> = props => {
	const { scrollableNode } = props
	const { account, assetType, asset } = useAccountParams()
	const [searchParams] = useSearchParams()
	const wrapperRef = useRef(null)
	const stickyRef = useRef(null)
	const entry = useIntersectionObserver(stickyRef, { threshold: [1] })
	const isSticky = !entry?.isIntersecting
	const isActivityRoute = !!searchParams.get(SEARCH_ACTIVITY_PARAM)
	const isVerticalScrollable = scrollableNode?.scrollHeight > scrollableNode?.clientHeight

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
		`/${routes.ACCOUNTS}${account ? `/${account}` : ''}${assetType ? `/${assetType}` : ''}${
			generateAssetLink && asset ? `/${asset}` : ''
		}${isActivity ? `?${SEARCH_ACTIVITY_PARAM}=true` : ''}`

	const getTabTitle = () => {
		switch (assetType) {
			case ASSET_TYPE_TOKENS: {
				return (
					<>
						{/* TODO: if the asset is XRD, should say `coin` not `token`  */}
						<Translation capitalizeFirstLetter text="accounts.home.assetsTokens" />
						{asset ? ` (${asset.toUpperCase()})` : ''}
					</>
				)
			}
			case ASSET_TYPE_NFTS: {
				return <Translation capitalizeFirstLetter text="accounts.home.assetsNfts" />
			}
			default:
				return <Translation capitalizeFirstLetter text="global.assets" />
		}
	}

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
							!isActivityRoute && styles.tabsWrapperButtonActive,
						)}
					>
						<Text size="medium" weight="strong" align="center" color={!isActivityRoute ? 'strong' : 'neutral'}>
							{getTabTitle()}
						</Text>
					</Link>
					<Link
						underline="never"
						to={generateAccountLink(true, true)}
						className={clsx(
							styles.tabsWrapperButton,
							styles.tabsWrapperButtonRight,
							isActivityRoute && styles.tabsWrapperButtonActive,
						)}
					>
						<Text size="medium" weight="strong" align="center" color={isActivityRoute ? 'strong' : 'neutral'}>
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
			</Box>
		</Box>
	)
}
