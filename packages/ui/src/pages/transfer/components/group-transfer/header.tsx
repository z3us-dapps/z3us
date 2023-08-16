import type { AddressBookEntry } from 'packages/ui/src/store/types'
import { getShortAddress } from 'packages/ui/src/utils/string-utils'
import React from 'react'

import { AccordionHeader, AccordionTrigger } from 'ui/src/components/accordion'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ChevronDown2Icon, TrashIcon } from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

interface IProps {
	sendIndex: number
	fromAccount: string
	knownAddresses: { [key: string]: AddressBookEntry }
	onRemoveGroup: (sendIndex: number) => void
}

export const GroupHeader: React.FC<IProps> = props => {
	const { knownAddresses, sendIndex, fromAccount, onRemoveGroup } = props

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		onRemoveGroup(sendIndex)
	}

	return (
		<AccordionHeader>
			<AccordionTrigger asChild>
				<Box className={styles.transferAccordionTriggerWrapper}>
					<Button
						styleVariant="secondary"
						sizeVariant="xlarge"
						fullWidth
						leftIcon={<ResourceImageIcon address={fromAccount} />}
						rightIcon={<ChevronDown2Icon className={styles.transferAccordionChevron} />}
					>
						<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
							<Text size="large" color="strong">
								{knownAddresses[fromAccount]?.name || getShortAddress(fromAccount)}
							</Text>
						</Box>
					</Button>
					{sendIndex !== 0 ? (
						<ToolTip side="top" message={<Translation capitalizeFirstLetter text="transfer.sendTokens.removeGroup" />}>
							<Button
								className={styles.transferAccordionDeleteBtn}
								iconOnly
								styleVariant="ghost"
								sizeVariant="small"
								onClick={handleDelete}
							>
								<TrashIcon />
							</Button>
						</ToolTip>
					) : null}
				</Box>
			</AccordionTrigger>
		</AccordionHeader>
	)
}
