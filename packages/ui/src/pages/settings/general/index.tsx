import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useMatches } from 'react-router-dom'
import { toast } from 'sonner'

import { Box } from 'ui/src/components/box'
import { Input } from 'ui/src/components/input'
import { SelectSimple } from 'ui/src/components/select'
import { Switch } from 'ui/src/components/switch'
import { Text } from 'ui/src/components/typography'
import { languages } from 'ui/src/constants/intl'
import { useSupportedCurrencies } from 'ui/src/hooks/queries/market'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { useTheme } from 'ui/src/hooks/use-theme'
import { Theme } from 'ui/src/types/types'

import { SettingsBlock } from '../components/settings-block'
import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'

const messages = defineMessages({
	title: {
		id: 'settings.general.title',
		defaultMessage: 'General',
	},
	subtitle: {
		id: 'settings.general.subtitle',
		defaultMessage: `Fine-tune your Z3US preferences. Manage session time and choose your ideal color theme for a personalized and secure Z3US experience`,
	},
	wallet_title: {
		id: 'settings.general.wallet.title',
		defaultMessage: 'Wallet',
	},
	wallet_subtitle: {
		id: 'settings.general.wallet.subtitle',
		defaultMessage: `Wallet name`,
	},
	network_title: {
		id: 'settings.general.network.title',
		defaultMessage: 'Network',
	},
	network_subtitle: {
		id: 'settings.general.network.subtitle',
		defaultMessage: `Gateway API URL`,
	},
	currency_title: {
		id: 'settings.general.currency.title',
		defaultMessage: 'Currency',
	},
	currency_subtitle: {
		id: 'settings.general.currency.subtitle',
		defaultMessage: `Display balances in your preferred currency`,
	},
	language_title: {
		id: 'settings.general.language.title',
		defaultMessage: 'Language',
	},
	language_subtitle: {
		id: 'settings.general.language.subtitle',
		defaultMessage: `Select your preferred language`,
	},
	notifications_title: {
		id: 'settings.general.notifications.title',
		defaultMessage: 'Notifications',
	},
	notifications_subtitle: {
		id: 'settings.general.notifications.subtitle',
		defaultMessage: `Enable push notifications to receive real-time updates and important alerts`,
	},
	theme_title: {
		id: 'settings.general.theme.title',
		defaultMessage: 'Theme',
	},
	theme_subtitle: {
		id: 'settings.general.theme.subtitle',
		defaultMessage: `Color Your Z3US Experience, select from light or dark themes, or let your system select for you`,
	},
	theme_light: {
		id: 'settings.general.theme.options.light',
		defaultMessage: 'Light',
	},
	theme_dark: {
		id: 'settings.general.theme.options.dark',
		defaultMessage: 'Dark',
	},
	theme_system: {
		id: 'settings.general.theme.options.system',
		defaultMessage: 'System',
	},
})

const General: React.FC = () => {
	const intl = useIntl()
	const { theme, setTheme } = useTheme()
	const matches = useMatches()
	const { data: currencies } = useSupportedCurrencies()

	const customSettings = matches
		.filter(match => Boolean((match.handle as any)?.custom))
		.map(match => (match.handle as any).custom)

	const { keystore, changeKeystoreName } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
		changeKeystoreName: state.changeKeystoreNameAction,
	}))

	const {
		currency,
		setCurrency,
		notifications,
		toggleNotifications,
		locale,
		selectLocale,
		gatewayBaseUrl,
		setGatewayUrl,
	} = useNoneSharedStore(state => ({
		currency: state.currency,
		setCurrency: state.setCurrencyAction,
		notifications: state.pushNotificationsEnabled,
		toggleNotifications: state.setPushNotificationsEnabledAction,
		locale: state.locale,
		selectLocale: state.selectLocaleAction,
		gatewayBaseUrl: state.gatewayBaseUrl,
		setGatewayUrl: state.setGatewayUrlAction,
	}))

	const handleToggleNotifications = () => {
		toggleNotifications(!notifications)
	}

	const handleGatewayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}

		setGatewayUrl(event.target.value)
	}

	const handleWalletNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}

		changeKeystoreName(keystore.id, event.target.value)
	}

	return (
		<SettingsWrapper>
			<SettingsTitle
				backLink="/settings"
				title={intl.formatMessage(messages.title)}
				subTitle={intl.formatMessage(messages.subtitle)}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.wallet_title)}
						</Text>
						<Box>
							<Text size="xsmall">{intl.formatMessage(messages.wallet_subtitle)}</Text>
						</Box>
					</>
				}
				rightCol={<Input value={keystore.name} elementType="input" type="url" onChange={handleWalletNameChange} />}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.network_title)}
						</Text>
						<Box>
							<Text size="xsmall">{intl.formatMessage(messages.network_subtitle)}</Text>
						</Box>
					</>
				}
				rightCol={<Input value={gatewayBaseUrl} elementType="input" type="url" onChange={handleGatewayChange} />}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.theme_title)}
						</Text>
						<Box>
							<Text size="xsmall">{intl.formatMessage(messages.theme_subtitle)}</Text>
						</Box>
					</>
				}
				rightCol={
					<SelectSimple
						capitalizeFirstLetter
						value={theme}
						onValueChange={_theme => {
							toast(`Theme has been updated ${_theme}`, {
								description: 'Just here for testing toasts',
							})
							setTheme(_theme as any)
						}}
						data={[
							{ id: Theme.LIGHT, title: intl.formatMessage(messages.theme_light) },
							{ id: Theme.DARK, title: intl.formatMessage(messages.theme_dark) },
							{ id: Theme.SYSTEM, title: intl.formatMessage(messages.theme_system) },
						]}
					/>
				}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.currency_title)}
						</Text>
						<Box>
							<Text size="xsmall">{intl.formatMessage(messages.currency_subtitle)}</Text>
						</Box>
					</>
				}
				rightCol={
					<SelectSimple
						value={currency.toLocaleLowerCase()}
						onValueChange={setCurrency}
						data={currencies?.map(curr => ({ id: curr, title: curr.toUpperCase() }))}
					/>
				}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.language_title)}
						</Text>
						<Box>
							<Text size="xsmall">{intl.formatMessage(messages.language_subtitle)}</Text>
						</Box>
					</>
				}
				rightCol={
					<SelectSimple
						value={locale}
						onValueChange={selectLocale}
						data={Object.entries(languages).map(([id, lang]) => ({ id, title: `${lang.flag} ${lang.name}` }))}
					/>
				}
			/>
			<SettingsBlock
				isBottomBorderVisible={false}
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.notifications_title)}
						</Text>
						<Box>
							<Text size="small">{intl.formatMessage(messages.notifications_subtitle)}</Text>
						</Box>
					</>
				}
				rightCol={
					<Box display="flex" alignItems="center" gap="medium">
						<Box>
							<Switch defaultChecked={notifications} onCheckedChange={handleToggleNotifications} />
						</Box>
					</Box>
				}
			/>
			{customSettings}
		</SettingsWrapper>
	)
}

export default General
