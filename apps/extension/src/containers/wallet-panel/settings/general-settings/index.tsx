import React from 'react'
import { useSharedStore } from '@src/store'
import { Box, Text } from 'ui/src/components/atoms'
import { StyledSlider, StyledTrack, StyledThumb, StyledRange } from 'ui/src/components/slider'

export const GeneralSettings: React.FC = () => {
	const { unlockTimer, setWalletUnclokTimeoutInMinutes } = useSharedStore(state => ({
		unlockTimer: state.walletUnlockTimeoutInMinutes,
		setWalletUnclokTimeoutInMinutes: state.setWalletUnclokTimeoutInMinutesAction,
	}))

	const handleChangeUnlockTime = ([minute]: Array<number>) => {
		setWalletUnclokTimeoutInMinutes(minute)
	}

	return (
		<Box css={{ px: '$3', py: '$3' }}>
			<Text size="3">Wallet will automatically lock after:</Text>
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
			<Box css={{ mt: '10px' }}>
				<Text bold size="3">
					{unlockTimer} {unlockTimer === 1 ? 'minute' : 'minutes'}
				</Text>
			</Box>
		</Box>
	)
}
