import { TrashIcon } from '@radix-ui/react-icons'
import React from 'react'

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

export const TrustedApps: React.FC = () => {
	const { approvedWebsites, declineWebsite } = useNoneSharedStore(state => ({
		approvedWebsites: state.approvedWebsites,
		declineWebsite: state.declineWebsiteAction,
	}))

	const hasApprovedSites = Object.keys(approvedWebsites || {})?.length > 0

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
											<Button size="2" color="red" onClick={() => declineWebsite(host)}>
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

export default TrustedApps
