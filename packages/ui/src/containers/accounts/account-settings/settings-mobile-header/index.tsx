import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { WalletDropdown } from 'ui/src/components/wallet-dropdown'
import { Z3usLogo } from 'ui/src/components/z3us-logo-babylon'

import * as styles from './settings-mobile-header.css'

export const SettingsMobileHeader = props => {
	const {
		className,
		isShadowVisible,
		leftSlot = (
			<Box className={styles.settingsHeaderLogoWrapper}>
				<Z3usLogo />
			</Box>
		),
		middleSlot = <Box />,
		rightSlot = <WalletDropdown />,
	} = props

	return (
		<Box
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
}
