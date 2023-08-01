import { languages } from 'packages/ui/src/constants/i18n'
import { Theme } from 'packages/ui/src/types/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { Box } from 'ui/src/components/box'
import { SelectSimple } from 'ui/src/components/select'
import { Switch } from 'ui/src/components/switch'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useSupportedCurrencies } from 'ui/src/hooks/queries/market'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useTheme } from 'ui/src/hooks/use-theme'

import * as styles from '../account-settings.css'
import { SettingsBlock } from '../components/settings-block'
import { SettingsTitle } from '../components/settings-title'

export const SettingsGeneral: React.FC = () => {
	const { t, i18n } = useTranslation()
	const { theme, setTheme } = useTheme()
	const { data: currencies } = useSupportedCurrencies()
	// eslint-disable-next-line
	const { currency, setCurrency, unlockTimer, setWalletUnlockTimeoutInMinutes } = useNoneSharedStore(state => ({
		currency: state.currency,
		setCurrency: state.setCurrencyAction,
		unlockTimer: state.walletUnlockTimeoutInMinutes,
		setWalletUnlockTimeoutInMinutes: state.setWalletUnlockTimeoutInMinutesAction,
	}))

	const handleChangeUnlockTime = async (minute: string) => {
		setWalletUnlockTimeoutInMinutes(parseInt(minute, 10))
	}

	return (
		<Box className={styles.settingsSectionFlexColumnWrapper}>
			<SettingsTitle
				backLink="/accounts/settings"
				title={<Translation capitalizeFirstLetter text="settings.navigation.generalTitle" />}
				subTitle={<Translation capitalizeFirstLetter text="settings.navigation.generalSubTitle" />}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							<Translation capitalizeFirstLetter text="settings.session.title" />
						</Text>
						<Text size="small">
							<Translation capitalizeFirstLetter text="settings.session.will_lock_after" />{' '}
							<Box component="span">
								{unlockTimer} {unlockTimer === 1 ? 'minute' : 'minutes'}
							</Box>
						</Text>
					</>
				}
				rightCol={
					<SelectSimple
						value={`${unlockTimer}`}
						placeholder={t('settings.session.select.placeholder')}
						onValueChange={handleChangeUnlockTime}
						data={[
							{ id: '1', title: t('settings.session.select.minute') },
							{ id: '5', title: t('settings.session.select.five_minutes') },
							{ id: '30', title: t('settings.session.select.half_an_hour') },
							{ id: '60', title: t('settings.session.select.hour') },
						]}
					/>
				}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							<Translation capitalizeFirstLetter text="settings.theme.title" />
						</Text>
						<Box>
							<Text size="small">{theme}</Text>
						</Box>
					</>
				}
				rightCol={
					<SelectSimple
						value={theme}
						placeholder={t('settings.theme.select.placeholder')}
						onValueChange={_theme => {
							toast(`Theme has been updated ${_theme}`, {
								description: 'Just here for testing toasts',
							})
							setTheme(_theme as any)
						}}
						data={[
							{ id: Theme.LIGHT, title: t('settings.theme.light') },
							{ id: Theme.DARK, title: t('settings.theme.dark') },
							{ id: Theme.SYSTEM, title: t('settings.theme.system') },
						]}
					/>
				}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							<Translation capitalizeFirstLetter text="settings.currency.title" />
						</Text>
						<Box>
							<Text size="small">{currency}</Text>
						</Box>
					</>
				}
				rightCol={
					<SelectSimple
						value={currency.toLocaleLowerCase()}
						placeholder={t('settings.currency.select.placeholder')}
						onValueChange={setCurrency}
						data={currencies?.map(curr => ({ id: curr, title: curr.toUpperCase() }))}
					/>
				}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							<Translation capitalizeFirstLetter text="settings.language.title" />
						</Text>
						<Box>
							<Text size="small">{languages[i18n.language].name}</Text>
						</Box>
					</>
				}
				rightCol={
					<SelectSimple
						value={i18n.language}
						placeholder={t('settings.language.select.placeholder')}
						onValueChange={i18n.changeLanguage}
						data={Object.entries(languages).map(([id, lang]) => ({ id, title: `${lang.flag} ${lang.name}` }))}
					/>
				}
			/>
			<SettingsBlock
				isBottomBorderVisible={false}
				leftCol={
					<Text size="large" weight="strong" color="strong">
						<Translation capitalizeFirstLetter text="settings.notifications.title" />
					</Text>
				}
				rightCol={
					<Box display="flex" alignItems="center" gap="medium">
						<Box>
							<Switch />
						</Box>
						<Box>
							<Text size="xsmall">
								<Translation capitalizeFirstLetter text="settings.notifications.push" />
							</Text>
						</Box>
					</Box>
				}
			/>
		</Box>
	)
}
