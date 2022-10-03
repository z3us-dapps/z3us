import React from 'react'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
} from 'ui/src/components/alert-dialog'
import { TrashIcon } from '@radix-ui/react-icons'
import Button from 'ui/src/components/button'

export const PendingActions: React.FC = () => {
	const { pendingActions, remove } = useNoneSharedStore(state => ({
		pendingActions: state.pendingActions,
		remove: state.removePendingActionAction,
	}))
	const hasPendingActions = Object.keys(pendingActions || {})?.length > 0

	const handleRemove = (value: string) => {
		remove(value)
	}

	return (
		<Box css={{ px: '$3', py: '$3' }}>
			{hasPendingActions ? (
				<>
					<Text medium css={{ pb: '$2' }}>
						Unconfirmed actions:
					</Text>
					{Object.keys(pendingActions).map(id => (
						<Flex align="center" key={id} css={{ pb: '2px' }}>
							<Box css={{ flex: '1' }}>
								<Text truncate color="muted" css={{ maxWidth: '260px' }}>
									{`${id}: ${new Date(pendingActions[id].createdAt).toLocaleDateString()}`}
								</Text>
							</Box>
							<AlertDialog>
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
					))}
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
