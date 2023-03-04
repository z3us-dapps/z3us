/* eslint-disable */
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import { Button } from '@src/components/button'

import * as styles from './account-settings.css'

interface IAccountSettingsRequiredProps {}

interface IAccountSettingsOptionalProps {
	className?: string
}

interface IAccountSettingsProps extends IAccountSettingsRequiredProps, IAccountSettingsOptionalProps {}

const defaultProps: IAccountSettingsOptionalProps = {
	className: undefined,
}

export const AccountSettings = forwardRef<HTMLElement, IAccountSettingsProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		return (
			<Box ref={ref} className={clsx(className)}>
				<Box>Transfer</Box>
			</Box>
		)
	},
)

AccountSettings.defaultProps = defaultProps
