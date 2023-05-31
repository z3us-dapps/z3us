/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import * as styles from './account-settings.css'

interface IAccountSettingsDesktopRequiredProps {}

interface IAccountSettingsDesktopOptionalProps {
	className?: string
	scrollableNode?: HTMLElement | null
	scrollTop?: number | undefined
}

interface IAccountSettingsDesktopProps extends IAccountSettingsDesktopRequiredProps, IAccountSettingsDesktopOptionalProps {}

const defaultProps: IAccountSettingsDesktopOptionalProps = {
	className: undefined,
	scrollableNode: undefined,
	scrollTop: undefined,
}

export const AccountSettingsDesktop = forwardRef<HTMLElement, IAccountSettingsDesktopProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollTop, scrollableNode } = props

		return (
			<Box ref={ref} className={clsx(styles.settingsWrapper, className)}>
				<Box>
					{[...Array(40)].map((_, i) => (
						// eslint-disable-next-line
						<Box key={i}>
							<Text size="xxxlarge">settings desktop</Text>
						</Box>
					))}
				</Box>
			</Box>
		)
	},
)

AccountSettingsDesktop.defaultProps = defaultProps
