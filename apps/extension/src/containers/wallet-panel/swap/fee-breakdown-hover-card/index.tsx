import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'ui/src/components/hover-card'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Text, Flex } from 'ui/src/components/atoms'

interface IProps {
	css?: any
}

export const FeeBreakdownHoverCard: React.FC<IProps> = ({ css }) => (
	<Box css={{ pl: '3px', transform: 'translateY(1px)', ...(css as any) }}>
		<HoverCard>
			<HoverCardTrigger asChild>
				<Flex css={{ color: '$txtHelp', display: 'inline-flex' }}>
					<InfoCircledIcon />
				</Flex>
			</HoverCardTrigger>
			<HoverCardContent side="top" sideOffset={5} css={{ maxWidth: '200px', pointerEvents: 'auto', zIndex: '99' }}>
				<Flex css={{ flexDirection: 'column', gap: '4px' }}>
					<Flex>
						<Text bold size="2" css={{ flex: '1' }}>
							Fee breakdown
						</Text>
					</Flex>
					<Flex>
						<Text medium size="2" css={{ flex: '1', color: '$txtHelp' }}>
							Network fee:
						</Text>
						<Text size="2">0.005484 XRD</Text>
					</Flex>
					<Flex>
						<Text medium size="2" css={{ flex: '1', color: '$txtHelp' }}>
							Exchange fee:
						</Text>
						<Text size="2">0.005484 XRD</Text>
					</Flex>
					<Flex>
						<Text medium size="2" css={{ flex: '1', color: '$txtHelp' }}>
							Z3US fee:
						</Text>
						<Text size="2">0.005484 XRD</Text>
					</Flex>
				</Flex>
			</HoverCardContent>
		</HoverCard>
	</Box>
)

FeeBreakdownHoverCard.defaultProps = {
	css: {},
}
