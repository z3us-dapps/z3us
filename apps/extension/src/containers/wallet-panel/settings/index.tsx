import React from 'react'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { useImmer } from 'use-immer'
import { KeyIcon, TrustedAppsIcon, NetworkIcon, AccountsIcon, AddressBookIcon } from 'ui/src/components/icons'
import { LockClosedIcon, TokensIcon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'ui/src/components/accordion'
import { AddressBook } from './address-book'
import { Accounts } from './accounts'
import { GeneralSettings } from './general-settings'
import { TrustedApps } from './trusted-apps'
import { NetworkSettings } from './network-settings'
import { KeyManagementSettings } from './key-management-settings'
import { accordians } from './constants'
import { TokenManagementSettings } from './token-management-settins'

export const Settings: React.FC = () => {
	const [state, setState] = useImmer({
		activeAccordion: '',
	})

	return (
		<Box
			css={{
				position: 'absolute',
				bottom: '55px',
				left: '0',
				right: '0',
				height: '497px',
			}}
		>
			<ScrollArea>
				<Box>
					<Box css={{ py: '20px', px: '23px' }}>
						<Box>
							<Text css={{ fontSize: '32px', lineHeight: '38px', fontWeight: '800' }}>Settings</Text>
							<Text size="3" medium css={{ mt: '20px' }}>
								Update wallet settings
							</Text>
						</Box>

						<Box css={{ pt: '12px', pb: '20px' }}>
							<Accordion
								type="single"
								value={state.activeAccordion}
								onValueChange={active => {
									setState(draft => {
										draft.activeAccordion = active
									})
								}}
								collapsible
							>
								<AccordionItem value={accordians.LOCK_SETTINGS}>
									<AccordionTrigger>
										<Flex align="center" css={{ flex: '1' }}>
											<LockClosedIcon />
											<Text size="3" medium css={{ ml: '$2' }}>
												General settings
											</Text>
										</Flex>
									</AccordionTrigger>
									<AccordionContent>
										<GeneralSettings />
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value={accordians.WEBSITES_MANAGEMENT}>
									<AccordionTrigger>
										<Flex align="center" css={{ flex: '1' }}>
											<TrustedAppsIcon />
											<Text size="3" medium css={{ ml: '$2' }}>
												Trusted apps
											</Text>
										</Flex>
									</AccordionTrigger>
									<AccordionContent>
										<TrustedApps />
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value={accordians.NETWORK}>
									<AccordionTrigger>
										<Flex align="center" css={{ flex: '1' }}>
											<NetworkIcon />
											<Text size="3" medium css={{ ml: '$2' }}>
												Network
											</Text>
										</Flex>
									</AccordionTrigger>
									<AccordionContent>
										<NetworkSettings />
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value={accordians.ACCOUNTS}>
									<AccordionTrigger>
										<Flex align="center" css={{ flex: '1' }}>
											<AccountsIcon />
											<Text size="3" medium css={{ ml: '$2' }}>
												Accounts
											</Text>
										</Flex>
									</AccordionTrigger>
									<AccordionContent>
										<Accounts />
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value={accordians.ADDRESS_BOOK}>
									<AccordionTrigger>
										<Flex align="center" css={{ flex: '1' }}>
											<AddressBookIcon />
											<Text size="3" medium css={{ ml: '$2' }}>
												Address book
											</Text>
										</Flex>
									</AccordionTrigger>
									<AccordionContent>
										<AddressBook />
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value={accordians.TOKEN_MANAGEMENT}>
									<AccordionTrigger>
										<Flex align="center" css={{ flex: '1' }}>
											<TokensIcon />
											<Text size="3" medium css={{ ml: '$2' }}>
												Token management
											</Text>
										</Flex>
									</AccordionTrigger>
									<AccordionContent css={{ padding: '0' }}>
										<TokenManagementSettings />
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value={accordians.KEY_MANAGEMENT}>
									<AccordionTrigger>
										<Flex align="center" css={{ flex: '1' }}>
											<KeyIcon />
											<Text size="3" medium css={{ ml: '$2' }}>
												Key & password management
											</Text>
										</Flex>
									</AccordionTrigger>
									<AccordionContent>
										<KeyManagementSettings />
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</Box>
					</Box>
				</Box>
			</ScrollArea>
		</Box>
	)
}
