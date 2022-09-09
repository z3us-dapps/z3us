/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { HardwareWalletIcon } from 'ui/src/components/icons'

import { ToolTip } from 'ui/src/components/tool-tip'
import { KeystoreType } from '@src/store/types'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectViewport,
	SelectItem,
	SelectItemText,
	SelectItemIndicator,
	SelectScrollUpButton,
	SelectScrollDownButton,
} from 'ui/src/components/select'
import { useSharedStore } from '@src/store'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import useMeasure from 'react-use-measure'

interface IProps {}

const defaultProps: Partial<IProps> = {
	pool: null,
}

export const WalletSelector: React.FC<IProps> = () => {
	const [open, setOpen] = useState<boolean>(false)
	const [measureRef, { width: triggerWidth }] = useMeasure()

	const { keystore, keystores, keystoreId, selectKeystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectKeystoreId),
		keystores: state.keystores,
		keystoreId: state.selectKeystoreId,
		selectKeystore: state.selectKeystoreAction,
	}))

	const isHardwareWallet = keystore.type === KeystoreType.HARDWARE

	const handleValueChange = async (id: string) => {
		setOpen(false)
		if (id === keystoreId) return
		selectKeystore(id)
	}

	return (
		<Select open={open} value={keystoreId} onValueChange={handleValueChange}>
			<SelectTrigger aria-label="Wallet selector" asChild onClick={() => setOpen(true)}>
				<Button
					ref={measureRef}
					css={{
						margin: '0',
						padding: '0',
						display: 'flex',
						align: 'center',
						justifyContent: 'center',
						bg: 'transparent',
						borderRadius: '3px',
						height: 'auto',
						width: '100%',
						position: 'relative',
						transition: '$default',
						ta: 'left',
						gap: '0',
					}}
				>
					<Box
						css={{
							pb: '10px',
							width: '100%',
							position: 'relative',
							transition: '$default',
							borderBottom: '2px solid',
							borderColor: '$borderPanel',
						}}
					>
						<Flex css={{ pb: '3px', mt: '3px', position: 'relative' }} justify="between">
							<Text
								truncate
								size="5"
								color="default"
								css={{ fontSize: '22px', lineHeight: '27px', maxWidth: isHardwareWallet ? '250px' : '280px' }}
							>
								<SelectValue />
							</Text>
							{isHardwareWallet && (
								<Box
									css={{ color: '$iconDefault', mt: '16px', mr: '8px', position: 'absolute', top: '0', right: '24px' }}
								>
									<HardwareWalletIcon />
								</Box>
							)}
							<Box css={{ color: '$iconDefault', mt: '16px', mr: '8px', position: 'absolute', top: '0', right: '0' }}>
								<ChevronDownIcon />
							</Box>
						</Flex>
						<Box css={{ pb: '7px' }}>
							<Text size="5" color="muted">
								Wallet
							</Text>
						</Box>
					</Box>
				</Button>
			</SelectTrigger>
			<SelectContent onPointerDownOutside={() => setOpen(false)}>
				<SelectScrollUpButton>
					<ChevronUpIcon />
				</SelectScrollUpButton>
				<SelectViewport>
					{keystores.map(({ id, name, type }) => (
						<SelectItem
							key={id}
							value={id}
							css={{
								'span:first-child': {
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
									maxWidth: `${triggerWidth - (type === KeystoreType.HARDWARE ? 35 : 25)}px`,
									minWidth: '100px',
								},
							}}
						>
							<SelectItemText>{name}</SelectItemText>
							<Flex justify="end" css={{ mr: '12px', flex: '1' }}>
								{type === KeystoreType.HARDWARE && (
									<ToolTip message="Hardware wallet account">
										<Box css={{ width: '24px', height: '24px' }}>
											<Button size="1" clickable={false}>
												<HardwareWalletIcon />
											</Button>
										</Box>
									</ToolTip>
								)}
							</Flex>
							<SelectItemIndicator />
						</SelectItem>
					))}
				</SelectViewport>
				<SelectScrollDownButton>
					<ChevronDownIcon />
				</SelectScrollDownButton>
			</SelectContent>
		</Select>
	)
}

WalletSelector.defaultProps = defaultProps
