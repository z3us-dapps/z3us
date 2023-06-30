import React from 'react'

import { Box } from 'ui/src/components/box'
import { SelectSimple } from 'ui/src/components/select'
import { Switch } from 'ui/src/components/switch'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
// import { StyledRange, StyledSlider, StyledThumb, StyledTrack } from 'ui/src/components/slider'
import { useSupportedCurrencies } from 'ui/src/hooks/queries/market'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import * as styles from '../account-settings.css'
import { SettingsBlock } from '../components/settings-block'
import { SettingsTitle } from '../components/settings-title'

export const SettingsGeneral: React.FC = () => {
	const { data: currencies } = useSupportedCurrencies()
	// eslint-disable-next-line
	const { currency, setCurrency, unlockTimer, setWalletUnclokTimeoutInMinutes } = useNoneSharedStore(state => ({
		currency: state.currency,
		setCurrency: state.setCurrencyAction,
		unlockTimer: state.walletUnlockTimeoutInMinutes,
		setWalletUnclokTimeoutInMinutes: state.setWalletUnclokTimeoutInMinutesAction,
	}))

	// const handleChangeUnlockTime = async ([minute]: Array<number>) => {
	// 	setWalletUnclokTimeoutInMinutes(minute)
	// }

	return (
		<Box className={styles.settingsSectionFlexColumnWrapper}>
			<SettingsTitle
				title={<Translation capitalizeFirstLetter text="settings.navigation.generalTitle" />}
				subTitle={<Translation capitalizeFirstLetter text="settings.navigation.generalSubTitle" />}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							Session lock
						</Text>
						<Text size="small">
							Wallet will lock after:
							<Box component="span">
								{unlockTimer} {unlockTimer === 1 ? 'minute' : 'minutes'}
							</Box>
						</Text>
					</>
				}
				rightCol={<Translation capitalizeFirstLetter text="settings.navigation.generalSubTitle" />}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							Theme
						</Text>
						<Box>
							<Text size="small">light</Text>
						</Box>
					</>
				}
				rightCol={
					<SelectSimple
						value="light"
						placeholder="Select currency"
						onValueChange={() => {}}
						data={[
							{ id: 'light', title: 'Light' },
							{ id: 'dark', title: 'Dark' },
							{ id: 'system', title: 'System' },
						]}
					/>
				}
			/>
			<SettingsBlock
				leftCol={
					<Text size="large" weight="strong" color="strong">
						Default currency
					</Text>
				}
				rightCol={
					<SelectSimple
						value={currency}
						placeholder="Select currency"
						onValueChange={setCurrency}
						data={currencies?.map(curr => ({ id: curr, title: curr.toUpperCase() }))}
					/>
				}
			/>
			<SettingsBlock
				leftCol={
					<Text size="large" weight="strong" color="strong">
						Default language
					</Text>
				}
				rightCol={
					<SelectSimple
						value={currency}
						placeholder="Select currency"
						onValueChange={setCurrency}
						data={currencies?.map(curr => ({ id: curr, title: curr.toUpperCase() }))}
					/>
				}
			/>
			<SettingsBlock
				isBottomBorderVisible={false}
				leftCol={
					<Text size="large" weight="strong" color="strong">
						Notifications
					</Text>
				}
				rightCol={
					<Box display="flex" alignItems="center" gap="medium">
						<Box>
							<Switch />
						</Box>
						<Box>
							<Text size="xsmall">Push</Text>
						</Box>
					</Box>
				}
			/>
		</Box>
	)
}
