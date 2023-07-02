import { type ClassValue } from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { AccountsIcon, AddressBookIcon, ArrowRightIcon, Settings2Icon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import { settingsMenuSlugs } from 'ui/src/constants/settings'

import * as styles from './settings-mobile-navigation.css'

export interface ISettingsMobileNavigation {
	className?: ClassValue
}

export const SettingsMobileNavigation: React.FC<ISettingsMobileNavigation> = props => {
	const { className } = props
	const { t } = useTranslation()

	return (
		<Box position="relative" className={className}>
			<Box className={styles.settingsMobileLinksWrapper}>
				{[
					{
						title: t('settings.navigation.generalTitle'),
						subTitle: t('settings.navigation.generalSubTitle'),
						href: settingsMenuSlugs.GENERAL,
						icon: <Settings2Icon />,
					},
					{
						title: t('settings.navigation.accountsTitle'),
						subTitle: t('settings.navigation.accountsSubTitle'),
						href: settingsMenuSlugs.ACCOUNTS,
						icon: <AccountsIcon />,
					},
					{
						title: t('settings.navigation.accountsAddressBookTitle'),
						subTitle: t('settings.navigation.accountsAddressBookSubTitle'),
						href: settingsMenuSlugs.ADDRESS_BOOK,
						icon: <AddressBookIcon />,
					},
				].map(({ href, title, subTitle, icon }, i) => (
					<Link key={href} to={href} className={styles.settingsMobileIndexLinkWrapper}>
						<Box className={styles.settingsMobileIndexLinkIconWrapper}>{icon}</Box>
						<Box className={styles.settingsMobileIndexLinkTextWrapper}>
							<Text color="strong" size="large" weight="strong">
								{title}
							</Text>
							<Text lineClamp={3} size="small">
								{subTitle}
							</Text>
						</Box>
						<Box className={styles.settingsMobileIndexArrowWrapper}>
							<ArrowRightIcon />
						</Box>
					</Link>
				))}
			</Box>
			{/* <Box>
				{Array.from({ length: 20 }, (_, i) => (
					<Text size="xlarge" key={i}>
						Lorum ipsumIn convallis vel neque facilisis est mi in varius gravida eget convallis convallis ut velit
						lacus, eros faucibus odio. Varius dui porttitor eu ac egestas in tempus nisi suscipit fusce urna. Vitae
						semper velit facilisis nunc, suspendisse vivamus duis vestibulum ullamcorper dui lectus sapien tempus sit eu
						dapibus arcu pellentesque.
					</Text>
				))}
			</Box> */}
		</Box>
	)
}
