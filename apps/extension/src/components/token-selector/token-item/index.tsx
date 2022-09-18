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
				height: '62px',
				alignItems: 'center',
				width: '100%',
				border: '1px solid $borderPanel',
				bg: '$bgPanel2',
				br: '$3',
				pr: '$2',
				pl: '0',
				display: 'flex',
				ta: 'left',

				mt: '8px',
				'&:hover': {
					background: '$bgPanelHover',
				},
			}}
		>
			<Box css={{ p: '12px' }}>
				<CircleAvatar
					width={40}
					height={40}
					image={token?.image}
					background="transparent"
					fallbackText={token?.symbol?.substring(0, 3).toLocaleUpperCase()}
				/>
			</Box>
			<Box css={{ flex: '1', pl: '2px' }}>
				<Text size="4" bold truncate css={{ maxWidth: '185px', mt: '3px' }}>
					{token?.name}
				</Text>
				<Text uppercase size="3" truncate css={{ mt: '3px', maxWidth: '185px' }}>
					{token?.symbol}
				</Text>
			</Box>
		</Button>
	)
}
