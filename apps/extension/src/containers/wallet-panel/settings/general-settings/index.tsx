import React from 'react'
import { useSharedStore } from '@src/store'
import { Box, Text } from 'ui/src/components/atoms'
import { StyledSlider, StyledTrack, StyledThumb, StyledRange } from 'ui/src/components/slider'
import { GET } from '@src/lib/actions'
import { CurrencySelector } from '@src/components/currency-selector'

export const GeneralSettings: React.FC = () => {
	const { messanger, isHardwareWallet, unlockTimer, setWalletUnclokTimeoutInMinutes } = useSharedStore(state => ({
		messanger: state.messanger,
		isHardwareWallet: state.isHardwareWallet,
		unlockTimer: state.walletUnlockTimeoutInMinutes,
		setWalletUnclokTimeoutInMinutes: state.setWalletUnclokTimeoutInMinutesAction,
	}))

	const handleChangeUnlockTime = async ([minute]: Array<number>) => {
		setWalletUnclokTimeoutInMinutes(minute)
		await messanger.sendActionMessageFromPopup(GET, null) // reload background timer
	}

	return (
		<Box css={{ px: '$3', py: '$3' }}>
			{!isHardwareWallet && (
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
		</Box>
	)
}
