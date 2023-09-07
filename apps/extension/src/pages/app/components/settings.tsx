import { chromeStorageSync } from '@radixdlt/connector-extension/src/chrome/helpers/chrome-storage-sync'
import type { ConnectorExtensionOptions } from '@radixdlt/connector-extension/src/options'
import { defaultConnectorExtensionOptions, getExtensionOptions } from '@radixdlt/connector-extension/src/options'
import React, { useEffect, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Switch } from 'ui/src/components/switch'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { SettingsBlock } from 'ui/src/pages/settings/components/settings-block'

const Settings: React.FC = () => {
	const { notifications, toggleNotifications } = useNoneSharedStore(state => ({
		notifications: state.pushNotificationsEnabled,
		toggleNotifications: state.setPushNotificationsEnabledAction,
	}))

	const [options, setOptions] = useState<ConnectorExtensionOptions>(defaultConnectorExtensionOptions)

	useEffect(() => {
		getExtensionOptions().map(setOptions)
	}, [])

	const handleToggleDAppRequestNotifications = () => {
		const updatedOptions = {
			...options,
			showDAppRequestNotifications: !notifications,
		}

		setOptions(updatedOptions)
		chromeStorageSync.setSingleItem('options', updatedOptions)

		toggleNotifications(!notifications)
	}

	const handleToggleTransactionResultNotifications = () => {
		const updatedOptions = {
			...options,
			showTransactionResultNotifications: !notifications,
		}

		setOptions(updatedOptions)
		chromeStorageSync.setSingleItem('options', updatedOptions)
	}

	return (
		<>
			<SettingsBlock
				isBottomBorderVisible={false}
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							<Translation
								capitalizeFirstLetter
								text="settings.notifications.radix.showDAppRequestNotifications.title"
							/>
						</Text>
						<Box>
							<Text size="small">
								<Translation
									capitalizeFirstLetter
									text="settings.notifications.radix.showDAppRequestNotifications.subTitle"
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
								text="settings.notifications.radix.showTransactionResultNotifications.title"
							/>
						</Text>
						<Box>
							<Text size="small">
								<Translation
									capitalizeFirstLetter
									text="settings.notifications.radix.showTransactionResultNotifications.subTitle"
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
	)
}

export default Settings
