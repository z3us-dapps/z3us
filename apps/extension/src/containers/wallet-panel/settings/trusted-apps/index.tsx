import React from 'react'
import { useStore } from '@src/store'
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

export const TrustedApps: React.FC = () => {
	const { approvedWebsites, declineWebsite } = useStore(state => ({
		approvedWebsites: state.approvedWebsites,
		declineWebsite: state.declineWebsiteAction,
	}))
	const hasApprovedSites = Object.keys(approvedWebsites || {})?.length > 0

	const handleRemoveWebsite = (value: string) => {
		declineWebsite(value)
	}

	return (
		<Box css={{ px: '$3', py: '$3' }}>
			{hasApprovedSites ? (
				<>
					<Text medium css={{ pb: '$2' }}>
						Approved applications:
					</Text>
					{Object.keys(approvedWebsites).map(host => (
						<Flex align="center" key={host} css={{ pb: '2px' }}>
							<Box css={{ flex: '1' }}>
								<Text truncate color="muted" css={{ maxWidth: '260px' }}>
									{host}
								</Text>
							</Box>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button size="1" color="ghost" iconOnly>
										<TrashIcon />
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogTitle>Remove app from trusted list?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently remove this {host} from your list of trusted
										applications.
									</AlertDialogDescription>
									<Flex justify="end">
										<AlertDialogCancel asChild>
											<Button size="2" color="tertiary" css={{ mr: '$2' }}>
												Cancel
											</Button>
										</AlertDialogCancel>
										<AlertDialogAction asChild>
											<Button size="2" color="red" onClick={() => handleRemoveWebsite(host)}>
												Yes, remove app
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
					No applications have been approved.
				</Text>
			)}
		</Box>
	)
}
