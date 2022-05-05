import React from 'react'
import { Text, Box, Flex, StyledLink } from 'ui/src/components/atoms'
import Link from 'next/link'
//import { Container } from '@nextui-org/react'
import { Z3usLogoText } from 'ui/src/components/z3us-logo-text'

export const Footer: React.FC = () => (
	<Box css={{ bg: '$bgPanelFooter', border: '1px solid $borderPanelFooter' }}>
		<Box>
			<Flex align="center" css={{ py: '$10' }}>
				<Box>
					<Link href="/" passHref>
						<a>
							<Z3usLogoText css={{ color: '$txtHelp' }} />
						</a>
					</Link>
					<Box css={{ mt: '$3', display: 'block' }}>
						<Text color="muted">&copy; {new Date().getFullYear()} z3us, Inc. All rights reserved. </Text>
					</Box>
				</Box>
				<Flex justify="end" gap="3" css={{ flex: '1', color: '$txtHelp' }}>
					<Link href="/privacy" passHref>
						<StyledLink underlineOnHover>
							<Text>Privacy</Text>
						</StyledLink>
					</Link>
					<Link href="/terms" passHref>
						<StyledLink underlineOnHover>
							<Text>Terms</Text>
						</StyledLink>
					</Link>
				</Flex>
			</Flex>
		</Box>
	</Box>
)
