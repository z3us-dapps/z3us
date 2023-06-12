import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components-v2/box'

import { WalletDropdown } from '@src/components/wallet-dropdown'
import { Z3usLogo } from '@src/components/z3us-logo-babylon'

import * as styles from './settings-mobile-header.css'

interface ISettingsMobileHeaderRequiredProps {}

interface ISettingsMobileHeaderOptionalProps {
	className?: string
	isShadowVisible?: boolean
	leftSlot?: React.ReactNode
	middleSlot?: React.ReactNode
	rightSlot?: React.ReactNode
}

interface ISettingsMobileHeaderProps extends ISettingsMobileHeaderRequiredProps, ISettingsMobileHeaderOptionalProps {}

const defaultProps: ISettingsMobileHeaderOptionalProps = {
	isShadowVisible: false,
	className: undefined,
	leftSlot: (
		<Box className={styles.settingsHeaderLogoWrapper}>
			<Z3usLogo />
		</Box>
	),

	middleSlot: <Box />,
	rightSlot: <WalletDropdown />,
}

export const SettingsMobileHeader = forwardRef<HTMLElement, ISettingsMobileHeaderProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, isShadowVisible, leftSlot, middleSlot, rightSlot } = props

		return (
			<Box
				ref={ref}
				className={clsx(
					styles.settingsMobileHeaderWrapper,
					isShadowVisible && styles.settingsMobileHeaderWrapperShadow,
					className,
				)}
			>
				<Box>{leftSlot}</Box>
				<Box className={styles.settingsMiddleSlotWrapper}>{middleSlot}</Box>
				<Box>{rightSlot}</Box>
			</Box>
		)
	},
)

SettingsMobileHeader.defaultProps = defaultProps
