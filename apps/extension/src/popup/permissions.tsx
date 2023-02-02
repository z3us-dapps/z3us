import React, { useEffect } from 'react'
import browser from 'webextension-polyfill'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useSharedStore, useNoneSharedStore } from '@src/hooks/use-store'
import { askForHostPermissions } from '@src/utils/permissions'
import { useImmer } from 'use-immer'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { Dialog, DialogContent } from 'ui/src/components/dialog'

interface IImmer {
	isDialogOpen: boolean
	origins: string[]
}

export const Permissions: React.FC = () => {
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectKeystoreId,
	}))
	const { networks } = useNoneSharedStore(state => ({
		networks: state.networks,
	}))

	const [state, setState] = useImmer<IImmer>({
		isDialogOpen: false,
		origins: [],
	})

	useEffect(() => {
		const init = async () => {
			try {
				const origins = await askForHostPermissions(networks)

				setState(draft => {
					draft.origins = origins
					draft.isDialogOpen = origins.length > 0
				})
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
			}
		}
		init()
	}, [keystoreId, networks])

	const handleCloseModal = () => {
		setState(draft => {
			draft.isDialogOpen = false
		})
	}

	const handleRequestPermissions = async () => {
		if (state.origins.length > 0) {
			const granted = await browser.permissions.request({ origins: state.origins })
			if (!granted) {
				throw new Error(`Permissions declined for: ${state.origins.join(', ')}`)
			}
		}

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
							Additional host permissions required!
						</Text>
						<Text css={{ mt: '$3' }}>
							Based on your current settings, wallet needs additional host permissions in order to work correctly.
						</Text>
					</Box>
					<Box css={{ height: '295px', position: 'relative' }}>
						<Box css={{ p: '$5' }}>
							<Box as="ul" css={{ pb: '$3' }} data-test-e2e="import-account-list">
								{state.origins.map(address => (
									<Flex as="li" align="center" key={address} css={{ pt: '$2' }}>
										<Text
											as="label"
											htmlFor={`select-${address}`}
											truncate
											css={{ maxWidth: '228px', pl: '$2', pr: '$2' }}
										>
											{address}
										</Text>
									</Flex>
								))}
							</Box>
						</Box>
					</Box>
					<Flex justify="end" gap="2" css={{ py: '$4', pl: '$3', pr: '$5', borderTop: '1px solid $borderPanel' }}>
						<Button size="3" color="primary" aria-label="allow" onClick={handleRequestPermissions}>
							Allow
						</Button>
						<Button size="3" color="tertiary" aria-label="deny" onClick={handleCloseModal}>
							Deny
						</Button>
					</Flex>
				</Flex>
			</DialogContent>
		</Dialog>
	)
}
