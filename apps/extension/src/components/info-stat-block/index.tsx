import React from 'react'
import { CircleAvatar } from '@src/components/circle-avatar'
import { Box, Text, Flex } from 'ui/src/components/atoms'

interface IProps {
	image?: string
	addressBookBackground?: string
	statSubTitle: string
	statTitle: string
}

const defaultProps = {
	image: undefined,
	addressBookBackground: undefined,
}

export const InfoStatBlock: React.FC<IProps> = ({ image, addressBookBackground, statSubTitle, statTitle }) => (
	<Box
		css={{
			display: 'flex',
			align: 'center',
			justifyContent: 'flex-start',
			mt: '12px',
			bg: '$bgPanel2',
			borderRadius: '8px',
			height: '64px',
			position: 'relative',
			width: '100%',
			ta: 'left',
		}}
	>
		<Box css={{ p: '8px' }}>
			<CircleAvatar image={image} background={addressBookBackground} />
		</Box>
		<Flex justify="center" direction="column" css={{ flex: '1', pl: '$1' }}>
			<Text
				truncate
				css={{
					fontSize: '13px',
					lineHeight: '16px',
					fontWeight: '500',
					mt: '3px',
					color: '$txtHelp',
					maxWidth: '236px',
				}}
			>
				{statSubTitle}
			</Text>
			<Flex css={{ mt: '2px' }}>
				<Text truncate css={{ fontSize: '18px', lineHeight: '21px', fontWeight: '500', maxWidth: '236px' }}>
					{statTitle}
				</Text>
			</Flex>
		</Flex>
	</Box>
)

InfoStatBlock.defaultProps = defaultProps
