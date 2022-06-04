import React from 'react'
import { useSharedStore } from '@src/store'
import { useImmer } from 'use-immer'
import { RightArrowIcon, TrashIcon, PlusIcon, HardwareWalletIcon } from 'ui/src/components/icons'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuItemIndicator,
} from 'ui/src/components/drop-down-menu'
import Input from 'ui/src/components/input'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { generateId } from '@src/utils/generate-id'
import { KeystoreType } from '@src/store/types'

const DEFAULT_KEYSTORE_NAME = 'main'

export const KeystoreSelector: React.FC = () => {
	const { keystores, keystore, selectKeystore, addKeystore, removeKeystore, removeWallet, lock } = useSharedStore(
		state => ({
			keystores: state.keystores,
			keystore: state.selectKeystoreId,
			addKeystore: state.addKeystore,
			removeKeystore: state.removeKeystore,
			selectKeystore: state.selectKeystore,
			lock: state.lockAction,
			removeWallet: state.removeWalletAction,
		}),
	)
	const [state, setState] = useImmer({
		name: '',
	})

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setState(draft => {
			draft.name = e.target.value
		})
	}

	const handleValueChange = async (keystoreId: string) => {
		selectKeystore(keystoreId)
		await lock()
	}

	const handleAddLocal = async () => {
		if (state.name === '') return
		addKeystore(generateId(), state.name, KeystoreType.LOCAL)
		await lock() // clear background memory
		window.location.hash = '#/onboarding'
	}

	const handleAddHardware = async () => {
		if (state.name === '') return
		addKeystore(generateId(), state.name, KeystoreType.HARDWARE)
		await lock() // clear background memory
		window.location.hash = '#/hardware-wallet'
	}

	const handleRemove = (keystoreId: string) => async () => {
		selectKeystore(keystoreId)
		await removeWallet()
		removeKeystore(keystoreId)
	}

	return (
		<Flex>
			<Box css={{ p: '$6' }}>
				<Box>
					<Input
						size="2"
						placeholder="Enter new wallet name"
						focusOnMount
						value={state.name}
						onChange={handleNameChange}
					/>
				</Box>
				<Flex css={{ mt: '$3' }}>
					<ButtonTipFeedback tooltip="Add local wallet" delay={500} bgColor="$bgPanel">
						<Button size="1" iconOnly color="ghost" onClick={handleAddLocal} disabled={state.name === ''}>
							Local wallet <PlusIcon />
						</Button>
					</ButtonTipFeedback>
					<ButtonTipFeedback tooltip="Add hardware wallet" delay={500} bgColor="$bgPanel">
						<Button size="1" iconOnly color="ghost" onClick={handleAddHardware} disabled={state.name === ''}>
							Hardware wallet <PlusIcon />
						</Button>
					</ButtonTipFeedback>
				</Flex>
			</Box>

			{keystores.length > 1 && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
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
								'&:hover': {
									bg: '$bgPanelHover',
								},
							}}
						>
							<Box css={{ flex: '1' }}>
								<Text
									truncate
									css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '2px', maxWidth: '210px' }}
								>
									{keystore || DEFAULT_KEYSTORE_NAME}
								</Text>
							</Box>
							<Box css={{ pr: '$1' }}>
								<RightArrowIcon />
							</Box>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						avoidCollisions={false}
						align="start"
						side="bottom"
						sideOffset={10}
						css={{ minWidth: '120px', width: '314px' }}
					>
						<DropdownMenuRadioGroup value={keystore} onValueChange={handleValueChange}>
							<DropdownMenuRadioItem value="">
								<DropdownMenuItemIndicator />
								<Text size="2" bold truncate css={{ maxWidth: '274px' }}>
									{DEFAULT_KEYSTORE_NAME}
								</Text>
							</DropdownMenuRadioItem>
							{keystores.map(({ id, name, type }) => (
								<DropdownMenuRadioItem key={id} value={id}>
									<DropdownMenuItemIndicator />
									<Text size="2" bold truncate css={{ maxWidth: '274px' }}>
										{name}
										{type === KeystoreType.HARDWARE && <HardwareWalletIcon />}
									</Text>
									<ButtonTipFeedback tooltip="Remove" delay={500} bgColor="$bgPanel">
										<Button size="1" iconOnly color="ghost" onClick={handleRemove(id)}>
											<TrashIcon />
										</Button>
									</ButtonTipFeedback>
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</Flex>
	)
}
