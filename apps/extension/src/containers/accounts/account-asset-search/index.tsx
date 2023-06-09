/* eslint-disable react/jsx-no-useless-fragment, @typescript-eslint/no-unused-vars */
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { ArrowUpIcon, SearchIcon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'
import Translation from '@src/components/translation'

import * as styles from './account-asset.css'

interface IAccountAssetSearchProps {
	balance: React.ReactNode
	className?: ClassValue
	scrollableNode: HTMLElement
}

export const AccountAssetSearch: React.FC<IAccountAssetSearchProps> = props => {
	const { className, balance, scrollableNode } = props

	const { pathname } = useLocation()
	const isScrolled = scrollableNode?.scrollTop > 0

	const handleUpClick = () => {
		if (!scrollableNode) return
		scrollableNode.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<Box className={clsx(styles.accountAssetWrapperWrapper, className)}>
			<Box display="flex" alignItems="center" position="relative" gap="large">
				<Box className={styles.accountSearchWrapper}>
					<Box className={styles.accountBalanceWrapper}>
						<>{balance}</>
					</Box>
					<ToolTip theme="backgroundPrimary" message={<Translation capitalizeFirstLetter text="global.up" />}>
						<Button
							className={clsx(styles.accountUpButton, isScrolled && styles.accountUpButtonVisible)}
							styleVariant="ghost"
							sizeVariant="small"
							onClick={handleUpClick}
							iconOnly
						>
							<ArrowUpIcon />
						</Button>
					</ToolTip>
					<ToolTip theme="backgroundPrimary" message={<Translation capitalizeFirstLetter text="global.search" />}>
						<Button
							className={styles.accountSearchButton}
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
