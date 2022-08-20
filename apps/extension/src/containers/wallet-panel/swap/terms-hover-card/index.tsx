import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'ui/src/components/hover-card'
import { Pool } from '@src/types'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Text, Flex, StyledLink } from 'ui/src/components/atoms'

interface IProps {
	pool?: Pool
	css?: any
}

export const TermsHoverCard: React.FC<IProps> = ({ pool, css }) => (
	<Box css={{ pl: '4px', mt: '1px', ...(css as any) }}>
		<HoverCard>
			<HoverCardTrigger asChild>
				<Flex css={{ color: '$txtHelp', display: 'inline-flex', textDecoration: 'underline' }}>
					<Text medium size="2" css={{ mr: '$1' }}>
						{`T&C's`}
					</Text>
					<InfoCircledIcon />
				</Flex>
			</HoverCardTrigger>
			<HoverCardContent side="top" sideOffset={5} css={{ maxWidth: '240px', pointerEvents: 'auto', zIndex: '99' }}>
				<Flex css={{ flexDirection: 'column', gap: 10, color: '$txtHelp' }}>
					<Text size="2">
						Presented fees and rates are indicative and are subject to change. Once submitted to the network, wallet and
						transaction fees apply at all times and are not refundable. By confirming swap you agree to our{' '}
						<StyledLink
							underline
							href="https://z3us.com/terms"
							target="_blank"
							onMouseDown={() => {
								// @TODO: Seems to be an issue using a hover card inside a dialog
								// https://github.com/radix-ui/primitives/issues/920
								window.open('https://z3us.com/terms', '_blank').focus()
							}}
						>
							T&amp;C
						</StyledLink>{' '}
						{pool && (
							<>
								, additional T&amp;C of {pool.name} may apply, learn more{' '}
								<StyledLink
									underline
									href={pool.url}
									target="_blank"
									onMouseDown={() => {
										// @TODO: Seems to be an issue using a hover card inside a dialog
										// https://github.com/radix-ui/primitives/issues/920
										window.open(pool.url, '_blank').focus()
									}}
								>
									{pool.url}
								</StyledLink>
								.
							</>
						)}
					</Text>
				</Flex>
			</HoverCardContent>
		</HoverCard>
	</Box>
)

TermsHoverCard.defaultProps = {
	css: {},
	pool: undefined,
}
