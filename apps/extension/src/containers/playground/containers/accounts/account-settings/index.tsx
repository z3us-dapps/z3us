/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import * as styles from './account-settings.css'

interface IAccountSettingsRequiredProps {}

interface IAccountSettingsOptionalProps {
	className?: string
	scrollableNode?: HTMLElement | null
	scrollTop?: number | undefined
}

interface IAccountSettingsProps extends IAccountSettingsRequiredProps, IAccountSettingsOptionalProps {}

const defaultProps: IAccountSettingsOptionalProps = {
	className: undefined,
	scrollableNode: undefined,
	scrollTop: undefined,
}

export const AccountSettings = forwardRef<HTMLElement, IAccountSettingsProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollTop, scrollableNode } = props

		return (
			<Box ref={ref} className={clsx(styles.settingsWrapper, className)}>
				<Box>
					{[...Array(30)].map((_, i) => (
						// eslint-disable-next-line
						<Box key={i}>
							<Text size="xxxlarge">settings</Text>
						</Box>
					))}
				</Box>
			</Box>
		)
	},
)

AccountSettings.defaultProps = defaultProps
