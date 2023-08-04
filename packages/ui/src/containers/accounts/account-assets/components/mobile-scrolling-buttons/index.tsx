/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useIntersectionObserver, useTimeout } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { ChevronDown3Icon, ChevronLeftIcon, Close2Icon, SearchIcon } from 'ui/src/components/icons'
import { type FormElement, Input } from 'ui/src/components/input'
import { Button } from 'ui/src/components/router-button'
import { Link } from 'ui/src/components/router-link'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { ASSET_TYPE_NFTS, ASSET_TYPE_TOKENS, SEARCH_ACTIVITY_PARAM, routes } from 'ui/src/constants/routes'
import { useAccountParams } from 'ui/src/hooks/use-account-params'
import { useIsAccountActivityRoute } from 'ui/src/hooks/use-is-account-activity-route'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import * as styles from './mobile-scrolling-button.css'

interface IMobileScrollingButtonsProps {
	scrollableNode: HTMLElement
}

export const MobileScrollingButtons: React.FC<IMobileScrollingButtonsProps> = props => {
	const { scrollableNode } = props
	const { account, asset } = useAccountParams()
	const wrapperRef = useRef(null)
	const stickyRef = useRef(null)
	const entry = useIntersectionObserver(stickyRef, { threshold: [1] })
	const isSticky = !entry?.isIntersecting

	const isAccountActivityRoute = useIsAccountActivityRoute()
	const isVerticalScrollable = scrollableNode?.scrollHeight > scrollableNode?.clientHeight
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
		`/${routes.ACCOUNTS}${account ? `?account=${account}` : ''}${asset ? `&asset=${asset}` : ''}${
			generateAssetLink && asset ? `/${asset}` : ''
		}${isActivity ? `?${SEARCH_ACTIVITY_PARAM}=true` : ''}`

	const generateBackLink = () => `/${routes.ACCOUNTS}`

	const getTabTitle = () => {
		switch (asset) {
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
							!isAccountActivityRoute && styles.tabsWrapperButtonActive,
						)}
					>
						<Text size="medium" weight="strong" align="center" color={!isAccountActivityRoute ? 'strong' : 'neutral'}>
							{getTabTitle()}
						</Text>
					</Link>
					<Link
						underline="never"
						to={generateAccountLink(true, true)}
						className={clsx(
							styles.tabsWrapperButton,
							styles.tabsWrapperButtonRight,
							isAccountActivityRoute && styles.tabsWrapperButtonActive,
						)}
					>
						<Text size="medium" weight="strong" align="center" color={isAccountActivityRoute ? 'strong' : 'neutral'}>
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
					{asset ? (
						<Button to={generateBackLink()} iconOnly styleVariant="ghost" sizeVariant="small" rounded>
							<ChevronLeftIcon />
						</Button>
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
							<Button iconOnly sizeVariant="small" styleVariant="ghost" rounded>
								<Close2Icon />
							</Button>
						}
						rightIconClassName={styles.inputSearchClearBtn}
						onChange={() => {}}
					/>
				</Box>
			</Box>
		</Box>
	)
}
