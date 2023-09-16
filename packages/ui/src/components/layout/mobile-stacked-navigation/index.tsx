import clsx, { type ClassValue } from 'clsx'
import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { Link } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { AddressBookIcon, ArrowRightIcon, CoinsIcon, Settings2Icon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'

import * as styles from './mobile-stacked-navigation.css'

const messages = defineMessages({
	general_title: {
		id: 'settings.navigation.general.title',
		defaultMessage: 'General',
	},
	general_subtitle: {
		id: 'settings.navigation.general.subtitle',
		defaultMessage:
			'Fine-tune your Z3US preferences. Manage session time and choose your ideal color theme for a personalized and secure Z3US experience.',
	},
	accounts_title: {
		id: 'settings.navigation.accounts.title',
		defaultMessage: 'Accounts',
	},
	accounts_subtitle: {
		id: 'settings.navigation.accounts.subtitle',
		defaultMessage: `Customize your Radix account's look and feel. Personalize your experience by choosing a unique background image and color scheme that suits your style.`,
	},
	address_book_title: {
		id: 'settings.navigation.address_book.title',
		defaultMessage: 'Address book',
	},
	address_book_subtitle: {
		id: 'settings.navigation.address_book.subtitle',
		defaultMessage:
			'Effortless organization for your address book accounts. Manage your Radix address book with ease, editing account names and addresses in a convenient table view for seamless transactions and better financial control.',
	},
})

export interface IMobileStackedNavigation {
	className?: ClassValue
	isVisible?: boolean
}

export const MobileStackedNavigation: React.FC<IMobileStackedNavigation> = props => {
	const { className, isVisible = true } = props

	const intl = useIntl()

	const menuItems = useMemo(
		() => [
			{
				title: intl.formatMessage(messages.general_title),
				subTitle: intl.formatMessage(messages.general_subtitle),
				href: '/settings/general',
				icon: <Settings2Icon />,
			},
			{
				title: intl.formatMessage(messages.accounts_title),
				subTitle: intl.formatMessage(messages.accounts_subtitle),
				href: '/settings/accounts',
				icon: <CoinsIcon />,
			},
			{
				title: intl.formatMessage(messages.address_book_title),
				subTitle: intl.formatMessage(messages.address_book_subtitle),
				href: '/settings/address-book',
				icon: <AddressBookIcon />,
			},
		],
		[],
	)

	return (
		<Box
			position="relative"
			className={clsx(
				isVisible ? styles.mobileStackedNavVisibleWrapper : styles.mobileStackedNavHiddenWrapper,
				className,
			)}
		>
			<Box className={styles.mobileStackedNavLinksWrapper}>
				{menuItems.map(({ href, title, icon }) => (
					<Link key={href} to={href} className={styles.mobileStackedNavLinkWrapper}>
						<Box className={styles.mobileStackedNavLinkIconWrapper}>{icon}</Box>
						<Box className={styles.mobileStackedNavLinkTextWrapper}>
							<Text color="strong" size="medium" weight="strong">
								{title}
							</Text>
						</Box>
						<Box className={styles.mobileStackedNavLinkArrowWrapper}>
							<ArrowRightIcon />
						</Box>
					</Link>
				))}
			</Box>
		</Box>
	)
}
