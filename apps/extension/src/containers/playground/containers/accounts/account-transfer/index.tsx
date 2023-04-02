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
	scrollableNode: HTMLElement | null
	scrollTop: number | undefined
}

interface IAccountTransferProps extends IAccountTransferRequiredProps, IAccountTransferOptionalProps {}

const defaultProps: IAccountTransferOptionalProps = {
	className: undefined,
	scrollableNode: undefined,
	scrollTop: undefined,
}

export const AccountTransfer = forwardRef<HTMLElement, IAccountTransferProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		return (
			<Box ref={ref} className={clsx(className)}>
				<Box>
					{[...Array(30)].map((_, i) => (
						<Box key={i}>
							<Text size="xxxlarge">lorum</Text>
							<Text size="xxxlarge">lorum</Text>
							<Text size="xxxlarge">lorum</Text>
						</Box>
					))}
				</Box>
			</Box>
		)
	},
)

AccountTransfer.defaultProps = defaultProps
