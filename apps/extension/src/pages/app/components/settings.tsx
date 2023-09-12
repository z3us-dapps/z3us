import { chromeStorageSync } from '@radixdlt/connector-extension/src/chrome/helpers/chrome-storage-sync'
import type { ConnectorExtensionOptions } from '@radixdlt/connector-extension/src/options'
import { defaultConnectorExtensionOptions, getExtensionOptions } from '@radixdlt/connector-extension/src/options'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box } from 'ui/src/components/box'
import { SelectSimple } from 'ui/src/components/select'
import { Switch } from 'ui/src/components/switch'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { SettingsBlock } from 'ui/src/pages/settings/components/settings-block'

const Settings: React.FC = () => {
	const { t } = useTranslation()
	const { unlockTimer, setWalletUnlockTimeoutInMinutes, radixConnectorEnabled, toggleRadixConnector } =
		useNoneSharedStore(state => ({
			unlockTimer: state.walletUnlockTimeoutInMinutes,
			setWalletUnlockTimeoutInMinutes: state.setWalletUnlockTimeoutInMinutesAction,
			radixConnectorEnabled: state.radixConnectorEnabled,
			toggleRadixConnector: state.setRadixConnectorEnabledAction,
		}))

	const [options, setOptions] = useState<ConnectorExtensionOptions>(defaultConnectorExtensionOptions)

	useEffect(() => {
		getExtensionOptions().map(setOptions)
	}, [])

	const handleChangeUnlockTime = (minute: string) => {
		setWalletUnlockTimeoutInMinutes(parseInt(minute, 10))
	}

	const handleToggleRadixConnector = () => {
		toggleRadixConnector(!radixConnectorEnabled)
	}

	const handleToggleDAppRequestNotifications = () => {
		const updatedOptions = {
			...options,
			showDAppRequestNotifications: !options.showDAppRequestNotifications,
		}

		setOptions(updatedOptions)
		chromeStorageSync.setSingleItem('options', updatedOptions)
	}

	const handleToggleTransactionResultNotifications = () => {
		const updatedOptions = {
			...options,
			showTransactionResultNotifications: !options.showTransactionResultNotifications,
		}

		setOptions(updatedOptions)
		chromeStorageSync.setSingleItem('options', updatedOptions)
	}

	return (
		<>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							<Translation capitalizeFirstLetter text="settings.session.title" />
						</Text>
						<Text size="xsmall">
							<Translation capitalizeFirstLetter text="settings.session.willLockAfter" />{' '}
							<Box component="span">
								{unlockTimer}{' '}
								{unlockTimer === 1 ? (
									<Translation capitalizeFirstLetter text="global.minute" />
								) : (
									<Translation capitalizeFirstLetter text="global.minutes" />
								)}
								.
							</Box>
						</Text>
					</>
				}
				rightCol={
					<SelectSimple
						value={`${unlockTimer}`}
						onValueChange={handleChangeUnlockTime}
						data={[
							{ id: '1', title: t('settings.session.select.oneMinute') },
							{ id: '5', title: t('settings.session.select.fiveMinutes') },
							{ id: '30', title: t('settings.session.select.thirtyMinutes') },
							{ id: '60', title: t('settings.session.select.sixtyMinutes') },
						]}
					/>
				}
			/>
			<SettingsBlock
				isBottomBorderVisible={false}
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							<Translation capitalizeFirstLetter text="settings.radix.radixConnectorEnabled.title" />
						</Text>
						<Box>
							<Text size="small">
								<Translation capitalizeFirstLetter text="settings.radix.radixConnectorEnabled.subTitle" />
							</Text>
						</Box>
					</>
				}
				rightCol={
					<Box display="flex" alignItems="center" gap="medium">
						<Box>
							<Switch defaultChecked={radixConnectorEnabled} onCheckedChange={handleToggleRadixConnector} />
						</Box>
					</Box>
				}
			/>
			{radixConnectorEnabled && (
				<>
					<SettingsBlock
						isBottomBorderVisible={false}
						leftCol={
							<>
								<Text size="large" weight="strong" color="strong">
									<Translation
										capitalizeFirstLetter
										text="settings.radix.showDAppRequestNotifications.title"
									/>
								</Text>
								<Box>
									<Text size="small">
										<Translation
											capitalizeFirstLetter
											text="settings.radix.showDAppRequestNotifications.subTitle"
										/>
									</Text>
								</Box>
							</>
						}
						rightCol={
							<Box display="flex" alignItems="center" gap="medium">
								<Box>
									<Switch
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
									<Translation
										capitalizeFirstLetter
										text="settings.radix.showTransactionResultNotifications.title"
									/>
								</Text>
								<Box>
									<Text size="small">
										<Translation
											capitalizeFirstLetter
											text="settings.radix.showTransactionResultNotifications.subTitle"
										/>
									</Text>
								</Box>
							</>
						}
						rightCol={
							<Box display="flex" alignItems="center" gap="medium">
								<Box>
									<Switch
										defaultChecked={!!options?.showTransactionResultNotifications}
										onCheckedChange={handleToggleTransactionResultNotifications}
									/>
								</Box>
							</Box>
						}
					/>
				</>
			)}
		</>
	)
}

export default Settings
