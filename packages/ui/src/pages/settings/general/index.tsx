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
import { useSupportedCurrencies } from 'ui/src/hooks/queries/coingecko'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useTheme } from 'ui/src/hooks/use-theme'
import { Theme } from 'ui/src/types'

import { SettingsBlock } from '../components/settings-block'
import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'

const messages = defineMessages({
	title: {
		id: '1iEPTM',
		defaultMessage: 'General',
	},
	subtitle: {
		id: 'kAap1n',
		defaultMessage: `Fine-tune your Z3US preferences. Manage session time and choose your ideal color theme for a personalized and secure Z3US experience`,
	},
	network_title: {
		id: 'I3JhPS',
		defaultMessage: 'Network',
	},
	network_subtitle: {
		id: 'NvAq+V',
		defaultMessage: `Gateway API URL`,
	},
	currency_title: {
		id: '55hdQy',
		defaultMessage: 'Currency',
	},
	currency_subtitle: {
		id: 'ega+/o',
		defaultMessage: `Display balances in your preferred currency`,
	},
	language_title: {
		id: 'y1Z3or',
		defaultMessage: 'Language',
	},
	language_subtitle: {
		id: 'PqV1fm',
		defaultMessage: `Select your preferred language`,
	},
	notifications_title: {
		id: 'NAidKb',
		defaultMessage: 'Notifications',
	},
	notifications_subtitle: {
		id: 'oVvUPZ',
		defaultMessage: `Enable push notifications to receive real-time updates and important alerts`,
	},
	theme_title: {
		id: 'Pe0ogR',
		defaultMessage: 'Theme',
	},
	theme_subtitle: {
		id: 'DFdIv/',
		defaultMessage: `Color Your Z3US Experience, select from light or dark themes, or let your system select for you`,
	},
	theme_light: {
		id: '3cc4Ct',
		defaultMessage: 'Light',
	},
	theme_dark: {
		id: 'tOdNiY',
		defaultMessage: 'Dark',
	},
	theme_system: {
		id: '+CwN9C',
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

	return (
		<SettingsWrapper>
			<SettingsTitle title={intl.formatMessage(messages.title)} subTitle={intl.formatMessage(messages.subtitle)} />
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.network_title)}
						</Text>
						<Text size="xsmall">{intl.formatMessage(messages.network_subtitle)}</Text>
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
						<Text size="xsmall">{intl.formatMessage(messages.theme_subtitle)}</Text>
					</>
				}
				rightCol={
					<SelectSimple
						capitalizeFirstLetter
						value={theme}
						onValueChange={_theme => {
							toast.success(`Theme has been updated ${_theme}`, {
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
						<Text size="xsmall">{intl.formatMessage(messages.currency_subtitle)}</Text>
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
						<Text size="xsmall">{intl.formatMessage(messages.language_subtitle)}</Text>
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
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.notifications_title)}
						</Text>
						<Text size="small">{intl.formatMessage(messages.notifications_subtitle)}</Text>
					</>
				}
				rightCol={
					<Box display="flex" alignItems="center" gap="medium">
						<Switch defaultChecked={notifications} onCheckedChange={handleToggleNotifications} />
					</Box>
				}
			/>
			{customSettings}
		</SettingsWrapper>
	)
}

export default General
