import React from 'react'
import { useSharedStore, useStore } from '@src/store'
import { RightArrowIcon, TrashIcon, PlusIcon } from 'ui/src/components/icons'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuItemIndicator,
} from 'ui/src/components/drop-down-menu'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { generateId } from '@src/utils/generate-id'

const DEFAULT_KEYSTORE_NAME = 'main'

export const KeystoreSelector: React.FC = () => {
	const { keystores, keystoreName, selectKeystore, addKeystore, removeKeystore, removeWallet, lock } = useSharedStore(
		state => ({
			keystores: state.keystores,
			keystoreName: state.selectKeystoreName,
			addKeystore: state.addKeystore,
			removeKeystore: state.removeKeystore,
			selectKeystore: state.selectKeystore,
			lock: state.lockAction,
			removeWallet: state.removeWalletAction,
		}),
	)
	const { lockWallet } = useStore(state => ({
		lockWallet: state.lockAction,
	}))

	const handleValueChange = async (keystoreId: string) => {
		selectKeystore(keystoreId)
		await lock()
		lockWallet()
	}

	const handleAdd = async () => {
		addKeystore(generateId())
		lock() // clear background memory
	}

	const handleRemove = (keystoreId: string) => async () => {
		selectKeystore(keystoreId)
		await removeWallet()
		removeKeystore(keystoreId)
	}

	return (
		<Flex>
			<ButtonTipFeedback tooltip="Remove" delay={500} bgColor="$bgPanel">
				<Button size="1" iconOnly color="ghost" onClick={handleAdd}>
					<PlusIcon />
				</Button>
			</ButtonTipFeedback>

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
								{keystoreName || DEFAULT_KEYSTORE_NAME}
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
					<DropdownMenuRadioGroup value={keystoreName} onValueChange={handleValueChange}>
						<DropdownMenuRadioItem value="">
							<DropdownMenuItemIndicator />
							<Text size="2" bold truncate css={{ maxWidth: '274px' }}>
								{DEFAULT_KEYSTORE_NAME}
							</Text>
						</DropdownMenuRadioItem>
						{keystores.map(keystoreId => (
							<DropdownMenuRadioItem key={keystoreId} value={keystoreId}>
								<DropdownMenuItemIndicator />
								<Text size="2" bold truncate css={{ maxWidth: '274px' }}>
									{keystoreId}
								</Text>
								<ButtonTipFeedback tooltip="Remove" delay={500} bgColor="$bgPanel">
									<Button size="1" iconOnly color="ghost" onClick={handleRemove(keystoreId)}>
										<TrashIcon />
									</Button>
								</ButtonTipFeedback>
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</Flex>
	)
}
