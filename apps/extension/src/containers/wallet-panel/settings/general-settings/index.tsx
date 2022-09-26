import React from 'react'
import { useAccountStore, useSharedStore } from '@src/hooks/use-store'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import { StyledSlider, StyledTrack, StyledThumb, StyledRange } from 'ui/src/components/slider'
import { GET } from '@src/lib/v1/actions'
import { CurrencySelector } from '@src/components/currency-selector'
import { KeystoreType } from '@src/types'

export const GeneralSettings: React.FC = () => {
	const {
		messanger,
		unlockTimer,
		transactionNotificationsEnabled,
		setWalletUnclokTimeoutInMinutes,
		setTransactionNotificationsEnabled,
	} = useSharedStore(state => ({
		messanger: state.messanger,
		unlockTimer: state.walletUnlockTimeoutInMinutes,
		transactionNotificationsEnabled: state.transactionNotificationsEnabled,
		setWalletUnclokTimeoutInMinutes: state.setWalletUnclokTimeoutInMinutesAction,
		setTransactionNotificationsEnabled: state.setTransactionNotificationsEnabledAction,
	}))

	const { signingKey } = useAccountStore(state => ({
		signingKey: state.signingKey,
	}))

	const handleChangeUnlockTime = async ([minute]: Array<number>) => {
		setWalletUnclokTimeoutInMinutes(minute)
		await messanger.sendActionMessageFromPopup(GET, null) // reload background timer
	}

	const handleSetTransactionNotificationsEnabled = checked => {
		setTransactionNotificationsEnabled(checked === true)
	}

	return (
		<Box css={{ px: '$3', py: '$3' }}>
			{signingKey.type === KeystoreType.LOCAL && (
				<Box css={{ mt: '$3' }}>
					<Text size="3">
						Wallet will lock after:
						<Box as="span" css={{ fontWeight: 'bold', pl: '2px' }}>
							{unlockTimer} {unlockTimer === 1 ? 'minute' : 'minutes'}
						</Box>
					</Text>
					<Box css={{ mt: '$3' }}>
						<StyledSlider
							onValueChange={handleChangeUnlockTime}
							defaultValue={[unlockTimer]}
							max={59}
							step={1}
							aria-label="lock timer"
							css={{ width: '100%' }}
						>
							<StyledTrack>
								<StyledRange />
							</StyledTrack>
							<StyledThumb />
						</StyledSlider>
					</Box>
				</Box>
			)}
			<Box css={{ mt: '$3' }}>
				<Text size="3" bold>
					Currency preference:
				</Text>
				<Box css={{ py: '$3' }}>
					<CurrencySelector />
				</Box>
			</Box>
			<Box css={{ mt: '$3' }}>
				<Text size="3" bold>
					Transaction notifications:
				</Text>
				<Box css={{ py: '$3' }}>
					<Flex align="center" justify="start">
						<Checkbox
							id="notifications"
							size="1"
							onCheckedChange={handleSetTransactionNotificationsEnabled}
							checked={transactionNotificationsEnabled}
						>
							<CheckIcon />
						</Checkbox>
						<Text size="2" as="label" css={{ pl: '$2' }} htmlFor="notifications">
							Enabled
						</Text>
					</Flex>
				</Box>
			</Box>
		</Box>
	)
}
