/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx, { ClassValue } from 'clsx'
import React, { useState } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { Table } from 'ui/src/components-v2/table'
import { Text } from 'ui/src/components-v2/typography'
import { LoadingBarsIcon, PlusIcon } from 'ui/src/components/icons'

import * as styles from '../account-settings.css'

interface ISettingsGeneralProps {
	className?: ClassValue
	scrollableNode: HTMLElement
}

export const SettingsAddressBook: React.FC<ISettingsGeneralProps> = props => {
	const { className, scrollableNode } = props

	const [value, setValue] = useState<string | undefined>()

	return (
		<Box className={clsx(styles.settingsSectionFlexColumnWrapper, className)}>
			{/* START TITLE SECTION */}
			<Box className={styles.settingsSectionWrapper}>
				<Box display="flex" flexDirection="column" gap="small">
					<Text size="xxlarge" weight="strong" color="strong">
						Address book
					</Text>
					<Box>
						<Text>
							Ut imperdiet nam nam velit eu magna, neque eu eu porta. m duis non pretium, mus laoreet tempor velit
							integer tristique etiam integer.
						</Text>
					</Box>
					<Box paddingTop="medium">
						<Button
							styleVariant="primary"
							// disabled
							leftIcon={<PlusIcon />}
						>
							New address
						</Button>
					</Box>

					{/* START ADDRESS BOOK TABLE */}
					<Box paddingTop="large">
						<Table scrollableNode={scrollableNode} />
					</Box>
					{/* END ADDRESS BOOK TABLE */}
				</Box>
			</Box>
			{/* END TITLE SECTION */}
		</Box>
	)
}
