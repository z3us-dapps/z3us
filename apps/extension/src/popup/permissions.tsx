/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { ChevronDownIcon, Cross2Icon, ResetIcon } from '@radix-ui/react-icons'
import { useSharedStore, useStore } from '@src/store'
import { askForHostPermissions } from '@src/utils/permissions'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { useImmer } from 'use-immer'
import { usePermissionsVault } from '@src/hooks/use-permissions'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'

interface IImmer {
	isDialogOpen: boolean
}

export const Permissions: React.FC = () => {
	// const origins = usePermissionsVault()
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectKeystoreId,
	}))
	const { networks } = useStore(state => ({
		networks: state.networks,
	}))

	const [state, setState] = useImmer<IImmer>({
		isDialogOpen: false,
	})

	useEffect(() => {
		try {
			const permissions = askForHostPermissions(networks)
			console.log('permissions:', permissions)
			setState(draft => {
				draft.isDialogOpen = true
			})
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}, [keystoreId])

	const handleCloseModal = () => {
		setState(draft => {
			draft.isDialogOpen = false
		})
	}

	return (
		<Dialog open={state.isDialogOpen}>
			<DialogContent css={{ p: '0' }}>
				<Flex direction="column" css={{ position: 'relative' }}>
					<Button
						color="ghost"
						iconOnly
						aria-label="close permission dialog"
						size="1"
						css={{ position: 'absolute', top: '$2', right: '$2' }}
						onClick={handleCloseModal}
					>
						<Cross2Icon />
					</Button>
					<Box css={{ p: '$5', pb: '$4', borderBottom: '1px solid $borderPanel' }}>
						<Text size="6" bold css={{ mb: '$2' }}>
							Select permissions
						</Text>
						<Text css={{ mt: '$3' }}>Select permission to allow them.</Text>
					</Box>
					<Box css={{ height: '295px', position: 'relative' }}>
						<Box css={{ p: '$5' }}>
							<Box as="ul" css={{ pb: '$3' }} data-test-e2e="import-account-list">
								{['Permission-1', 'Permission-2'].map(address => {
									const addressString = address
									return (
										<Flex as="li" align="center" key={addressString} css={{ pt: '$2' }}>
											<Checkbox
												data-test-e2e="import-account-checkbox"
												id={`select-${addressString}`}
												// onCheckedChange={handleSelectIndex(index)}
												// checked={!!state.selectedIndexes[index]}
												css={{ pr: '$2' }}
											>
												<CheckIcon />
											</Checkbox>
											<Text
												as="label"
												htmlFor={`select-${addressString}`}
												truncate
												css={{ maxWidth: '228px', pl: '$2', pr: '$2' }}
											>
												{addressString}
											</Text>
										</Flex>
									)
								})}
							</Box>
						</Box>
					</Box>
					<Flex justify="end" gap="2" css={{ py: '$4', pl: '$3', pr: '$5', borderTop: '1px solid $borderPanel' }}>
						<Box css={{ flex: '1' }}>
							<Button size="3" color="ghost" aria-label="clear" onClick={() => {}}>
								<ResetIcon />
								Clear
							</Button>
						</Box>
						<Button size="3" color="tertiary" aria-label="close token select modal" onClick={handleCloseModal}>
							Close
						</Button>
					</Flex>
				</Flex>
			</DialogContent>
		</Dialog>
	)
}
