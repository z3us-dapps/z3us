/* eslint-disable */
import clsx, { type ClassValue } from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, Route, Routes, useLocation, useMatch } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ArrowLeftIcon, ChevronDown3Icon, ChevronLeftIcon, HomeIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import { settingsMenuSlugs } from 'ui/src/constants/settings'

import * as styles from './settings-mobile-navigation.css'

export interface ISettingsMobileNavigation {
	className?: ClassValue
	title?: string | React.ReactElement
	subTitle?: string | React.ReactElement
	isBottomBorderVisible?: boolean
}

export const SettingsMobileNavigation: React.FC<ISettingsMobileNavigation> = props => {
	const { className, title, subTitle, isBottomBorderVisible = true } = props

	const { t } = useTranslation()

	return (
		<Box position="relative" className={className}>
			<Box display="flex" flexDirection="column">
				{[
					{ text: t('settings.navigation.generalTitle'), href: settingsMenuSlugs.GENERAL },
					{ text: t('settings.navigation.accountsTitle'), href: settingsMenuSlugs.ACCOUNTS },
					{ text: t('settings.navigation.accountsAddressBookTitle'), href: settingsMenuSlugs.ADDRESS_BOOK },
				].map(({ href, title }, i) => (
					<Link key={href} to={href} className={styles.settingsMobileIndexLinkWrapper}>
						<Box className={styles.settingsMobileIndexLinkIconWrapper}>
							<HomeIcon />
						</Box>
						<Box className={styles.settingsMobileIndexLinkTextWrapper}>
							<Text color="strong" size="large" weight="strong">
								{title}
							</Text>
							<Text lineClamp={3}>
								Lorum ipsumIn convallis vel neque facilisis est mi in varius gravida eget convallis convallis ut velit
								lacus, eros faucibus odio. Varius dui porttitor eu ac egestas in tempus nisi suscipit fusce urna. Vitae
								semper velit facilisis nunc, suspendisse vivamus duis vestibulum ullamcorper dui lectus sapien tempus
								sit eu dapibus arcu pellentesque.
							</Text>
						</Box>
					</Link>
				))}
			</Box>{' '}
		</Box>
	)
}
