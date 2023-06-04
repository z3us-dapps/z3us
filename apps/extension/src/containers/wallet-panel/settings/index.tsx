import { LockClosedIcon, TokensIcon } from '@radix-ui/react-icons'
import type { ReactNode} from 'react';
import React, { Suspense, lazy } from 'react'
import { useImmer } from 'use-immer'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'ui/src/components/accordion'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import {
	AccountsIcon,
	ActivityIcon,
	AddressBookIcon,
	KeyIcon,
	NetworkIcon,
	TrustedAppsIcon,
} from 'ui/src/components/icons'
import { ScrollArea } from 'ui/src/components/scroll-area'

import { accordians } from './constants'

const AddressBook = lazy(() => import('./address-book'))
const Accounts = lazy(() => import('./accounts'))
const GeneralSettings = lazy(() => import('./general-settings'))
const TrustedApps = lazy(() => import('./trusted-apps'))
const NetworkSettings = lazy(() => import('./network-settings'))
const KeyManagementSettings = lazy(() => import('./key-management-settings'))
const TokenManagementSettings = lazy(() => import('./token-management-settins'))
// @TODO:
// const ImportSettings = lazy(() => import('./import-settings'))
const PendingActions = lazy(() => import('./pending-actions'))

const AccordionSettingsItem = ({
	value,
	title,
	icon,
	children,
}: {
	value: string
	title: string
	icon: ReactNode
	children: ReactNode
}) => (
	<AccordionItem value={value}>
		<AccordionTrigger>
			<Flex align="center" css={{ flex: '1' }}>
				{icon}
				<Text size="3" medium css={{ ml: '$2' }}>
					{title}
				</Text>
			</Flex>
		</AccordionTrigger>
		<AccordionContent>
			<Suspense fallback="Loading...">{children}</Suspense>
		</AccordionContent>
	</AccordionItem>
)

interface ImmerT {
	activeAccordion: string
}

export const Settings: React.FC = () => {
	const [state, setState] = useImmer<ImmerT>({
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
							<Text size="3" medium css={{ mt: '22px' }}>
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
								<AccordionSettingsItem
									value={accordians.LOCK_SETTINGS}
									icon={<LockClosedIcon />}
									title="General settings"
								>
									<GeneralSettings />
								</AccordionSettingsItem>

								<AccordionSettingsItem
									value={accordians.WEBSITES_MANAGEMENT}
									icon={<TrustedAppsIcon />}
									title="Trusted apps"
								>
									<TrustedApps />
								</AccordionSettingsItem>

								<AccordionSettingsItem
									value={accordians.WEBSITES_ACTIONS}
									icon={<ActivityIcon />}
									title="Unconfirmed actions"
								>
									<PendingActions />
								</AccordionSettingsItem>

								<AccordionSettingsItem value={accordians.NETWORK} icon={<NetworkIcon />} title="Network">
									<NetworkSettings />
								</AccordionSettingsItem>

								<AccordionSettingsItem value={accordians.ACCOUNTS} icon={<AccountsIcon />} title="Accounts">
									<Accounts />
								</AccordionSettingsItem>

								<AccordionSettingsItem value={accordians.ADDRESS_BOOK} icon={<AddressBookIcon />} title="Address book">
									<AddressBook />
								</AccordionSettingsItem>

								<AccordionSettingsItem
									value={accordians.TOKEN_MANAGEMENT}
									icon={<TokensIcon />}
									title="Token management"
								>
									<TokenManagementSettings />
								</AccordionSettingsItem>

								<AccordionSettingsItem
									value={accordians.KEY_MANAGEMENT}
									icon={<KeyIcon />}
									title="Key & password management"
								>
									<KeyManagementSettings />
								</AccordionSettingsItem>
							</Accordion>

							{/* <ImportSettings /> */}
						</Box>
					</Box>
				</Box>
			</ScrollArea>
		</Box>
	)
}

export default Settings
