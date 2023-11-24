import type { ConnectorExtensionOptions } from '@radixdlt/connector-extension/src/options'
import { defaultConnectorExtensionOptions, getExtensionOptions } from '@radixdlt/connector-extension/src/options'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { SelectSimple } from 'ui/src/components/select'
import { Switch } from 'ui/src/components/switch'
import { Text } from 'ui/src/components/typography'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { SettingsBlock } from 'ui/src/pages/settings/components/settings-block'

const messages = defineMessages({
	session_never: {
		id: 'G3UF1P',
		defaultMessage: 'Keep unlocked',
	},
	session_one_minute: {
		id: 'KmpMrM',
		defaultMessage: '1 Minute',
	},
	session_five_minutes: {
		id: 'TpOkJW',
		defaultMessage: '5 Minutes',
	},
	session_thirty_minutes: {
		id: 'JWC9pV',
		defaultMessage: 'Half an hour',
	},
	session_sixty_minutes: {
		id: 'h9vCBR',
		defaultMessage: '1 Hour',
	},
	session_title: {
		id: '9zc7GA',
		defaultMessage: 'Auto-Lock timer',
	},
	session_subtitle: {
		id: 'msf7hM',
		defaultMessage: `Z3US will automatically lock after {unlockTimer, plural,
			=0 {never}
			one {1 minute}
			other {{unlockTimer} minutes}
		}`,
	},
	connector_extension_title: {
		id: 'XAh8Lv',
		defaultMessage: 'Radix connector',
	},
	connector_extension_subtitle: {
		id: 'RbDCwV',
		defaultMessage: 'Enable embedded radix connector',
	},
	dapp_request_notifications_title: {
		id: 'nFGyxg',
		defaultMessage: 'Request Notifications',
	},
	dapp_request_notifications_subtitle: {
		id: 'OTbA2H',
		defaultMessage: 'Show DApp request Radix notifications',
	},
	tx_result_notifications_title: {
		id: 'HX9Q52',
		defaultMessage: 'Transaction Result Notifications',
	},
	tx_result_notifications_subtitle: {
		id: 'xu+1Bu',
		defaultMessage: 'Show transaction result Radix notifications',
	},
})

const Settings: React.FC = () => {
	const intl = useIntl()
	const { unlockTimer, setWalletUnlockTimeoutInMinutes, radixConnectorEnabled, toggleRadixConnector } =
		useNoneSharedStore(state => ({
			unlockTimer: state.walletUnlockTimeoutInMinutes,
			setWalletUnlockTimeoutInMinutes: state.setWalletUnlockTimeoutInMinutesAction,
			radixConnectorEnabled: state.radixConnectorEnabled,
			toggleRadixConnector: state.toggleRadixConnectorEnabledAction,
		}))

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [options, setOptions] = useState<ConnectorExtensionOptions>(defaultConnectorExtensionOptions)

	useEffect(() => {
		getExtensionOptions().map(setOptions)
	}, [])

	const handleChangeUnlockTime = (minute: string) => {
		setWalletUnlockTimeoutInMinutes(parseInt(minute, 10))
	}

	const handleToggleRadixConnector = async () => {
		toggleRadixConnector(!radixConnectorEnabled)
	}

	const handleToggleDAppRequestNotifications = async () => {
		const updatedOptions = {
			...options,
			showDAppRequestNotifications: !options.showDAppRequestNotifications,
		}

		setIsLoading(true)
		await browser.storage.sync.set({ options: updatedOptions })
		setOptions(updatedOptions)
		setIsLoading(false)
	}

	const handleToggleTransactionResultNotifications = async () => {
		const updatedOptions = {
			...options,
			showTransactionResultNotifications: !options.showTransactionResultNotifications,
		}

		setIsLoading(true)
		await browser.storage.sync.set({ options: updatedOptions })
		setOptions(updatedOptions)
		setIsLoading(false)
	}

	return (
		<>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.session_title)}
						</Text>
						<Text size="xsmall">{intl.formatMessage(messages.session_subtitle, { unlockTimer })}</Text>
					</>
				}
				rightCol={
					<SelectSimple
						value={`${unlockTimer}`}
						onValueChange={handleChangeUnlockTime}
						width={160}
						fullWidth
						data={[
							{ id: '0', title: intl.formatMessage(messages.session_never) },
							{ id: '1', title: intl.formatMessage(messages.session_one_minute) },
							{ id: '5', title: intl.formatMessage(messages.session_five_minutes) },
							{ id: '30', title: intl.formatMessage(messages.session_thirty_minutes) },
							{ id: '60', title: intl.formatMessage(messages.session_sixty_minutes) },
						]}
					/>
				}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.connector_extension_title)}
						</Text>
						<Box>
							<Text size="small">{intl.formatMessage(messages.connector_extension_subtitle)}</Text>
						</Box>
					</>
				}
				rightCol={
					<Box display="flex" alignItems="center" gap="medium">
						<Box>
							<Switch
								disabled={isLoading}
								defaultChecked={radixConnectorEnabled}
								onCheckedChange={handleToggleRadixConnector}
							/>
						</Box>
					</Box>
				}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.dapp_request_notifications_title)}
						</Text>
						<Box>
							<Text size="small">{intl.formatMessage(messages.dapp_request_notifications_subtitle)}</Text>
						</Box>
					</>
				}
				rightCol={
					<Box display="flex" alignItems="center" gap="medium">
						<Box>
							<Switch
								disabled={isLoading}
								defaultChecked={!!options?.showDAppRequestNotifications}
								onCheckedChange={handleToggleDAppRequestNotifications}
							/>
						</Box>
					</Box>
				}
			/>
			<SettingsBlock
				isBottomBorderVisible={false}
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.tx_result_notifications_title)}
						</Text>
						<Box>
							<Text size="small">{intl.formatMessage(messages.tx_result_notifications_subtitle)}</Text>
						</Box>
					</>
				}
				rightCol={
					<Box display="flex" alignItems="center" gap="medium">
						<Box>
							<Switch
								disabled={isLoading}
								defaultChecked={!!options?.showTransactionResultNotifications}
								onCheckedChange={handleToggleTransactionResultNotifications}
							/>
						</Box>
					</Box>
				}
			/>
		</>
	)
}

export default Settings
