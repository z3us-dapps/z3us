/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import * as styles from './account-settings.css'

interface IAccountSettingsMobileRequiredProps {}

interface IAccountSettingsMobileOptionalProps {
	className?: string
	scrollableNode?: HTMLElement | null
	scrollTop?: number | undefined
}

interface IAccountSettingsMobileProps extends IAccountSettingsMobileRequiredProps, IAccountSettingsMobileOptionalProps {}

const defaultProps: IAccountSettingsMobileOptionalProps = {
	className: undefined,
	scrollableNode: undefined,
	scrollTop: undefined,
}

export const AccountSettingsMobile = forwardRef<HTMLElement, IAccountSettingsMobileProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollTop, scrollableNode } = props

		return (
			<Box ref={ref} className={clsx(styles.settingsWrapper, className)}>
				<Box>
					{[...Array(30)].map((_, i) => (
						// eslint-disable-next-line
						<Box key={i}>
							<Text size="xxxlarge">settings mobile</Text>
						</Box>
					))}
				</Box>
			</Box>
		)
	},
)

AccountSettingsMobile.defaultProps = defaultProps
