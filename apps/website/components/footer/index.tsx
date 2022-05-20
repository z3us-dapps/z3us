import React from 'react'
import { Text, Box, Flex, StyledLink } from 'ui/src/components/atoms'
import Link from 'next/link'
import { ThemePickerMenu } from 'components/theme-picker-menu'
import { Container, Row, Col } from 'react-grid-system'
import { PageContainer } from 'components/page-container'
import { Z3usLogoText } from 'ui/src/components/z3us-logo-text'

export const Footer: React.FC = () => (
	<Box css={{ bg: '$bgPanelFooter', border: '1px solid $borderPanelFooter', pb: '20px' }}>
		<PageContainer>
			<Container fluid>
				<Row>
					<Col>
						<Flex align="center" css={{ py: '30px', '@xs': { px: '24px' }, '@md': { px: '0' } }}>
							<Box>
								<Link href="/" passHref>
									<StyledLink
										css={{
											display: 'inline-flex',
											transition: '$default',
											'&:hover': {
												opacity: '0.8',
											},
										}}
									>
										<Z3usLogoText css={{ color: '$txtHelp' }} />
									</StyledLink>
								</Link>
								<Box css={{ mt: '$2', display: 'block' }}>
									<Text
										as="p"
										color="help"
										css={{
											fontFamily: '$HaasGrotTextRound',
											fontSize: '13px',
											lineHeight: '14px',
										}}
									>
										&copy; {new Date().getFullYear()}
									</Text>
								</Box>
							</Box>
						</Flex>
					</Col>
					<Col>
						<Flex
							align="center"
							justify="end"
							css={{ flex: '1', color: '$txtHelp', py: '30px', '@xs': { px: '24px' }, '@md': { px: '0' } }}
						>
							<Link href="/privacy" passHref>
								<StyledLink underlineOnHover>
									<Text
										as="p"
										css={{
											fontFamily: '$HaasGrotTextRound',
											fontSize: '13px',
											lineHeight: '14px',
										}}
									>
										Privacy
									</Text>
								</StyledLink>
							</Link>
							<Link href="/terms" passHref>
								<StyledLink underlineOnHover css={{ ml: '12px', mr: '4px' }}>
									<Text
										as="p"
										css={{
											fontFamily: '$HaasGrotTextRound',
											fontSize: '13px',
											lineHeight: '14px',
										}}
									>
										Terms
									</Text>
								</StyledLink>
							</Link>
							<ThemePickerMenu />
						</Flex>
					</Col>
				</Row>
			</Container>
		</PageContainer>
	</Box>
)
