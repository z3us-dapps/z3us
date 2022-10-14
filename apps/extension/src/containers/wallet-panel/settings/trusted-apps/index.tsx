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

export const TrustedApps: React.FC = () => {
	const { approvedWebsites, blockedWebsites, declineWebsite, unblockWebsite } = useNoneSharedStore(state => ({
		approvedWebsites: state.approvedWebsites,
		blockedWebsites: state.blockedWebsites,
		declineWebsite: state.declineWebsiteAction,
		unblockWebsite: state.unblockWebsiteAction,
	}))

	const hasApprovedSites = Object.keys(approvedWebsites || {})?.length > 0
	const hasBlockedSites = Object.keys(blockedWebsites || {})?.length > 0

	return (
		<>
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

			<Box css={{ px: '$3', py: '$3' }}>
				{hasBlockedSites ? (
					<>
						<Text medium css={{ pb: '$2' }}>
							Blocked applications:
						</Text>
						{Object.keys(blockedWebsites).map(host => (
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
										<AlertDialogTitle>Remove app from blocked list?</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This will permanently remove this {host} from your list of blocked
											applications.
										</AlertDialogDescription>
										<Flex justify="end">
											<AlertDialogCancel asChild>
												<Button size="2" color="tertiary" css={{ mr: '$2' }}>
													Cancel
												</Button>
											</AlertDialogCancel>
											<AlertDialogAction asChild>
												<Button size="2" color="red" onClick={() => unblockWebsite(host)}>
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
						No applications have been blocked.
					</Text>
				)}
			</Box>
		</>
	)
}

export default TrustedApps
