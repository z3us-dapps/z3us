import React from 'react'
import { useColorMode } from '@src/hooks/use-color-mode'
import { RefreshIcon } from 'ui/src/components/icons'
import { Box } from 'ui/src/components/atoms'

interface IProps {
	onSwitchTokens: () => void
}

export const SwitchTokensButton = ({ onSwitchTokens }: IProps): JSX.Element => {
	const isDarkMode = useColorMode()
	return (
		<Box
			as="button"
			onClick={onSwitchTokens}
			aria-label="switch tokens"
			css={{
				position: 'absolute',
				cursor: 'pointer',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				top: '-18px',
				left: '50%',
				ml: '-16px',
				width: '32px',
				height: '32px',
				borderRadius: '50%',
				background: '$bgToolTip1',
				margin: 'none',
				padding: 'none',
				color: isDarkMode ? '$white' : '$iconActive',
				boxShadow: '0px 10px 44px rgba(0, 0, 0, 0.35)',
				border: '1px solid',
				borderColor: isDarkMode ? '$borderPanel' : 'transparent',
				svg: {
					transition: '$default',
				},
				'&:hover': {
					svg: {
						transition: '$default',
						transform: 'rotate(180deg)',
					},
				},
			}}
		>
			<RefreshIcon />
		</Box>
	)
}
