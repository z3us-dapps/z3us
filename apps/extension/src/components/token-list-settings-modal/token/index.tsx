import React from 'react'
import { useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { CircleAvatar } from '@src/components/circle-avatar'
import { Box, Flex, Text, StyledLink } from 'ui/src/components/atoms'
import { ToolTip } from 'ui/src/components/tool-tip'
import { EXPLORER_URL } from '@src/config'

interface IProps {
	rri: string
	isDragging: boolean
}

export const Token: React.FC<IProps> = ({ rri, isDragging }) => {
	const { data: token } = useTokenInfo(rri)

	return (
		<Flex
			align="center"
			css={{
				height: '36px',
				backgroundColor: '$buttonBgTertiary',
				py: '$2',
				pl: '$2',
				pr: '$1',
				br: '$2',
				opacity: isDragging ? '0.7' : '1',
			}}
		>
			<ToolTip message="Go to explorer" sideOffset={3} side="top">
				<StyledLink target="_blank" href={`${EXPLORER_URL}/tokens/${rri}/`}>
					<CircleAvatar
						shadow={false}
						borderWidth={0}
						width={22}
						height={22}
						image={token?.image}
						fallbackText={(token?.symbol || '').substring(0, 3).toLocaleUpperCase()}
						avatarFallBackCss={{ fontSize: '8px' }}
						background="$bgPanel"
					/>
				</StyledLink>
			</ToolTip>
			<Box css={{ flex: '1', pl: '6px' }}>
				<Text size="1" bold truncate css={{ maxWidth: '78px' }}>
					{token?.name}
				</Text>
				<Text uppercase size="1" truncate css={{ mt: '1px', maxWidth: '78px' }}>
					{token?.symbol}
				</Text>
			</Box>
		</Flex>
	)
}
