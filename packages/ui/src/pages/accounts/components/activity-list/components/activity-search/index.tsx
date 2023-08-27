import clsx from 'clsx'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'
import { useIntersectionObserver } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { ArrowUpIcon, SearchIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'

import * as styles from './styles.css'

export const ActivitySearch: React.FC = () => {
	const { scrollableNode } = useScroll()

	const { t } = useTranslation()
	const { pathname } = useLocation()
	const { accountId, resourceId } = useParams()
	const resourceType = useResourceType()

	const elementRef = useRef<HTMLDivElement | null>(null)
	const entry = useIntersectionObserver(elementRef, { threshold: [1] })
	const isSticky = !entry?.isIntersecting

	const isBorderVisible = resourceType || !!accountId

	const searchTitle = resourceId
		? `${resourceId} ${t('global.activity')}`
		: `${resourceType || t('global.all')} ${t('global.activity')}`

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
					<ToolTip message={<Translation capitalizeFirstLetter text="global.up" />}>
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
					<ToolTip message="global.search">
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
