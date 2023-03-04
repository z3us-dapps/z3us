/* eslint-disable */
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import { Button } from '@src/components/button'

import * as styles from './account-transfer.css'

interface IAccountTransferRequiredProps {}

interface IAccountTransferOptionalProps {
	className?: string
}

interface IAccountTransferProps extends IAccountTransferRequiredProps, IAccountTransferOptionalProps {}

const defaultProps: IAccountTransferOptionalProps = {
	className: undefined,
}

export const AccountTransfer = forwardRef<HTMLElement, IAccountTransferProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		return (
			<Box ref={ref} className={clsx(className)}>
				<Box>Transfer</Box>
			</Box>
		)
	},
)

AccountTransfer.defaultProps = defaultProps
