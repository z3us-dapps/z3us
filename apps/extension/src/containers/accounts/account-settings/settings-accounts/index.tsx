/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import React, { forwardRef, useState } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { SelectSimple } from 'ui/src/components-v2/select'
import { Switch } from 'ui/src/components-v2/switch'
import { Text } from 'ui/src/components-v2/typography'
import { LoadingBarsIcon } from 'ui/src/components/icons'

import * as styles from '../account-settings.css'

interface ISettingsAccountsProps {
	className?: ClassValue
}

export const SettingsAccounts: React.FC<ISettingsAccountsProps> = forwardRef<HTMLElement, ISettingsAccountsProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		const [value, setValue] = useState<string | undefined>()

		return (
			<Box ref={ref} className={clsx(className)}>
				{/* START TITLE SECTION */}
				<Box className={styles.settingsSectionBorderWrapper}>
					<Box display="flex" flexDirection="column" gap="small">
						<Text size="xxlarge" weight="strong" color="strong">
							Accounts settings
						</Text>
						<Box>
							<Text>
								Ut imperdiet nam nam velit eu magna, neque eu eu porta. m duis non pretium, mus laoreet tempor velit
								integer tristique etiam integer.
							</Text>
						</Box>
					</Box>
				</Box>
			</Box>
		)
	},
)
