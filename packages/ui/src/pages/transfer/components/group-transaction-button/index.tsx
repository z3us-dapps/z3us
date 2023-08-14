import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { InformationIcon, PlusIcon } from 'ui/src/components/icons'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'ui/src/components/popover'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

interface IProps {
	onAddGroup: () => void
}

export const GroupTransactionButton: React.FC<IProps> = props => {
	const { onAddGroup } = props

	return (
		<Box paddingTop="large" display="flex" flexDirection="column" gap="medium">
			<Box display="flex" width="full" flexDirection="column">
				<Box display="flex" paddingBottom="small" gap="xsmall">
					<Box paddingTop="xxsmall">
						<Text color="strong" weight="strong" size="large">
							<Translation capitalizeFirstLetter text="transfer.group.groupTransaction" />
						</Text>
					</Box>
					<PopoverRoot>
						<PopoverTrigger asChild>
							<Box>
								<Button
									styleVariant="ghost"
									sizeVariant="xsmall"
									iconOnly
									aria-label={<Translation capitalizeFirstLetter text="transfer.group.groupTransaction" />}
								>
									<InformationIcon />
								</Button>
							</Box>
						</PopoverTrigger>
						<PopoverPortal>
							<PopoverContent align="start" sideOffset={2} style={{ maxWidth: '300px' }}>
								<Box padding="medium" display="flex" flexDirection="column" gap="small">
									<Text size="xsmall">
										<Translation capitalizeFirstLetter text="transfer.group.groupInfoPopover" />
									</Text>
								</Box>
							</PopoverContent>
						</PopoverPortal>
					</PopoverRoot>
				</Box>
				<Box>
					<Button
						styleVariant="tertiary"
						sizeVariant="xlarge"
						fullWidth
						onClick={onAddGroup}
						leftIcon={
							<Box marginLeft="small">
								<PlusIcon />
							</Box>
						}
					>
						<Translation capitalizeFirstLetter text="transfer.group.addGroup" />
					</Button>
				</Box>
			</Box>
		</Box>
	)
}
