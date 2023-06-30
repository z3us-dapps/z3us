import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { LoadingBarsIcon } from 'ui/src/components/icons'
import { SelectSimple } from 'ui/src/components/select'
import { Switch } from 'ui/src/components/switch'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
// import { StyledRange, StyledSlider, StyledThumb, StyledTrack } from 'ui/src/components/slider'
import { useSupportedCurrencies } from 'ui/src/hooks/queries/market'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import * as styles from '../account-settings.css'
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
			{/* START LOCK SECTION */}
			<Box className={styles.settingsSectionBorderWrapper}>
				<Box className={styles.settingsSectionGridBasic}>
					<Box display="flex" flexDirection="column">
						<Text size="large" weight="strong" color="strong">
							Session lock
						</Text>
						<Box>
							<Text size="small">
								Wallet will lock after:
								<Box component="span">
									{unlockTimer} {unlockTimer === 1 ? 'minute' : 'minutes'}
								</Box>
							</Text>
						</Box>
					</Box>
					<Box display="flex" flexDirection="column" gap="small">
						{/* <StyledSlider
								onValueChange={handleChangeUnlockTime}
								defaultValue={[unlockTimer]}
								max={59}
								step={1}
								aria-label="session lock timer"
								css={{ width: '100%' }}
							>
								<StyledTrack>
									<StyledRange />
								</StyledTrack>
								<StyledThumb />
							</StyledSlider> */}
					</Box>
				</Box>
			</Box>
			{/* END LOCK SELECT */}
			{/* START COLOR THEME SECTION */}
			<Box className={styles.settingsSectionBorderWrapper}>
				<Box className={styles.settingsSectionGridBasic}>
					<Box display="flex" flexDirection="column">
						<Text size="large" weight="strong" color="strong">
							Theme
						</Text>
						<Box>
							<Text size="small">light</Text>
						</Box>
					</Box>
					<Box display="flex" flexDirection="column" gap="small">
						<Box>
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
						</Box>
					</Box>
				</Box>
			</Box>
			{/* END COLOR THEME SELECTION */}
			{/* START CURRENCY SELECTION SECTION */}
			<Box className={styles.settingsSectionBorderWrapper}>
				<Box className={styles.settingsSectionGridBasic}>
					<Box display="flex" flexDirection="column">
						<Text size="large" weight="strong" color="strong">
							Default currency
						</Text>
						<Box>
							<Text size="small">{currency?.toUpperCase()}</Text>
						</Box>
					</Box>
					<Box display="flex" flexDirection="column" gap="small">
						<Box>
							<SelectSimple
								value={currency}
								placeholder="Select currency"
								onValueChange={setCurrency}
								data={currencies?.map(curr => ({ id: curr, title: curr.toUpperCase() }))}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
			{/* END CURRENCY SELECTION */}
			{/* START TOKEN PREFERNCE */}
			<Box className={styles.settingsSectionBorderWrapper}>
				<Box className={styles.settingsSectionGridBasic}>
					<Box display="flex" flexDirection="column">
						<Text size="large" weight="strong" color="strong">
							Default language
						</Text>
						<Box>
							<Text size="small">Ut imperdiet</Text>
						</Box>
					</Box>
					<Box display="flex" flexDirection="column" gap="small">
						<pre>asdf</pre>
					</Box>
				</Box>
			</Box>
			{/* END TOKEN PREFERNCE */}
			{/* START NOTIFICATIONS SECTION */}
			<Box className={styles.settingsSectionBorderWrapper}>
				<Box className={styles.settingsSectionGridBasic}>
					<Box display="flex" flexDirection="column">
						<Text size="large" weight="strong" color="strong">
							Notifications
						</Text>
						<Box>
							<Text size="small">Ut imperdiet</Text>
						</Box>
					</Box>
					<Box display="flex" flexDirection="column" gap="small">
						<Box display="flex" alignItems="center" gap="medium">
							<Box>
								<Switch />
							</Box>
							<Box>
								<Text size="xsmall">Push</Text>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
			{/* END NOTIFICATIONS SECTION */}
			{/* START SAVE SETTINGS SECTION */}
			<Box className={styles.settingsSectionBorderWrapper}>
				<Box className={styles.settingsSectionGridBasic}>
					<Box display="flex" flexDirection="column">
						<Text size="large" weight="strong" color="strong">
							Save settings
						</Text>
						<Box>
							<Text size="small">Sync to cloud</Text>
						</Box>
					</Box>
					<Box display="flex" flexDirection="column" gap="small">
						<Box>
							<pre>folder to save the settings</pre>
						</Box>
					</Box>
				</Box>
			</Box>
			{/* END SAVE SETTINGS SECTION */}
			{/* SAVE SECTION */}
			<Box className={styles.settingsSectionWrapper}>
				<Box className={styles.settingsSectionGridBasic}>
					<Box className={styles.settingsSectionGridBasicSpacer}>&nbsp;</Box>
					<Box display="flex" flexDirection="column" gap="small">
						<Box width="full" display="flex" justifyContent="flex-end">
							<Button
								styleVariant="primary"
								sizeVariant="large"
								disabled
								rightIcon={
									<Box marginLeft="small">
										<LoadingBarsIcon />
									</Box>
								}
							>
								Save
							</Button>
						</Box>
					</Box>
				</Box>
			</Box>
			{/* END SAVE SECTION */}
		</Box>
	)
}
