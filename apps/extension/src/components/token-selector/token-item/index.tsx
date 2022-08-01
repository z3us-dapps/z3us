import React from 'react'
import { useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { CircleAvatar } from '@src/components/circle-avatar'
import { Box, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'

interface IProps {
	rri: string
	onClick: (rri: string) => void
}

export const TokenItem: React.FC<IProps> = ({ rri, onClick }) => {
	const { data: token } = useTokenInfo(rri)

	return (
		<Button
			onClick={() => onClick(rri)}
			css={{
				display: 'flex',
				align: 'center',
				justifyContent: 'flex-start',
				mt: '12px',
				bg: '$bgPanel',
				borderRadius: '8px',
				height: '64px',
				position: 'relative',
				width: '100%',
				ta: 'left',
				'&:hover': {
					bg: '$bgPanelHover',
				},
			}}
		>
			<Box css={{ p: '12px' }}>
				<CircleAvatar
					width={40}
					height={40}
					image={token?.image || token?.iconURL}
					fallbackText={token?.symbol?.substring(0, 3).toLocaleUpperCase()}
				/>
			</Box>
			<Box css={{ flex: '1', pl: '2px' }}>
				<Text size="4" bold truncate css={{ maxWidth: '185px' }}>
					{token?.name}
				</Text>
				<Text uppercase size="3" truncate css={{ mt: '4px', maxWidth: '185px' }}>
					{token?.symbol}
				</Text>
			</Box>
		</Button>
	)
}
