import { ExternalLinkIcon, TrashIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useLocation } from 'wouter'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from 'ui/src/components/alert-dialog'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'

import { useNoneSharedStore } from '@src/hooks/use-store'
import { hexToJSON } from '@src/utils/encoding'

export const PendingActions: React.FC = () => {
	const [, setLocation] = useLocation()
	const { pendingActions, remove } = useNoneSharedStore(state => ({
		pendingActions: state.pendingActions,
		remove: state.removePendingActionAction,
	}))
	const hasPendingActions = Object.keys(pendingActions || {})?.length > 0

	const handleRemove = (value: string) => {
		remove(value)
	}

	const handleOpenAction = (action, id) => {
		setLocation(`#/notification/${action}/${id}`)
	}

	return (
		<Box css={{ px: '$3', py: '$3' }}>
			{hasPendingActions ? (
				<>
					<Text medium css={{ pb: '$2' }}>
						Unconfirmed actions:
					</Text>
					{Object.keys(pendingActions)
						.reverse()
						.map(id => {
							const { createdAt, payloadHex } = pendingActions[id]
							const { action = null } = payloadHex ? hexToJSON(payloadHex) : {}
							return (
								<Flex align="center" key={id} css={{ pb: '2px' }}>
									<Box css={{ flex: '1' }}>
										<Text truncate color="muted" css={{ maxWidth: '260px' }}>
											{`${id}: ${new Date(createdAt).toLocaleDateString()}`}
										</Text>
									</Box>
									<AlertDialog>
										{action && (
											<Button size="1" color="ghost" iconOnly onClick={() => handleOpenAction(action, id)}>
												<ExternalLinkIcon />
											</Button>
										)}
										<AlertDialogTrigger asChild>
											<Button size="1" color="ghost" iconOnly>
												<TrashIcon />
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogTitle>Remove pendind actions?</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone. This will permanently remove this {id} action from your list.
											</AlertDialogDescription>
											<Flex justify="end">
												<AlertDialogCancel asChild>
													<Button size="2" color="tertiary" css={{ mr: '$2' }}>
														Cancel
													</Button>
												</AlertDialogCancel>
												<AlertDialogAction asChild>
													<Button size="2" color="red" onClick={() => handleRemove(id)}>
														Yes, remove action
													</Button>
												</AlertDialogAction>
											</Flex>
										</AlertDialogContent>
									</AlertDialog>
								</Flex>
							)
						})}
				</>
			) : (
				<Text medium css={{ pb: '$2', pt: '$1' }}>
					No pending actions.
				</Text>
			)}
		</Box>
	)
}

export default PendingActions
