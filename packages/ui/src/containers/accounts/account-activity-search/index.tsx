/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { useAccountParam, useAssetParam } from 'packages/ui/src/hooks/use-params'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'
import { useIntersectionObserver } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { ArrowUpIcon, Close2Icon, SearchIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

import * as styles from './account-search.css'

interface IAccountActivitySearchProps {
	scrollableNode: HTMLElement
}

export const AccountActivitySearch: React.FC<IAccountActivitySearchProps> = props => {
	const { scrollableNode } = props

	const { t } = useTranslation()
	const { pathname } = useLocation()
	const { assetType } = useParams()
	const account = useAccountParam()
	const asset = useAssetParam()

	const elementRef = useRef<HTMLDivElement | null>(null)
	const entry = useIntersectionObserver(elementRef, { threshold: [1] })
	const isSticky = !entry?.isIntersecting

	const isBorderVisible = asset || !!account

	const searchTitle = asset
		? `${asset} ${t('global.activity')}`
		: `${assetType || t('global.all')} ${t('global.activity')}`

	const handleUpClick = () => {
		if (!scrollableNode) return
		scrollableNode.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<Box
			ref={elementRef}
			className={clsx(
				styles.accountSearchWrapperWrapperSticky,
				isSticky && styles.accountSearchWrapperWrapperStickyShadow,
				isBorderVisible && styles.accountSearchBorderWrapper,
			)}
		>
			<Box display="flex" alignItems="center" position="relative" gap="large">
				<Box className={styles.accountSearchWrapper}>
					<Box className={styles.accountSearchTextWrapper} flexShrink={0}>
						<Text capitalizeFirstLetter size="large" weight="strong" color="strong" truncate>
							{searchTitle}
						</Text>
					</Box>
					<ToolTip theme="backgroundPrimary" message={<Translation capitalizeFirstLetter text="global.up" />}>
						<Button
							className={clsx(styles.accountUpButton, !isSticky && styles.accountUpButtonHidden)}
							styleVariant="ghost"
							sizeVariant="small"
							onClick={handleUpClick}
							iconOnly
						>
							<ArrowUpIcon />
						</Button>
					</ToolTip>
					<ToolTip theme="backgroundPrimary" message="global.search">
						<Button
							className={clsx(styles.accountSearchButton)}
							styleVariant="ghost"
							sizeVariant="small"
							to={`${pathname}?query=hello&account=all`}
							iconOnly
						>
							<SearchIcon />
						</Button>
					</ToolTip>
				</Box>
			</Box>
		</Box>
	)
}
