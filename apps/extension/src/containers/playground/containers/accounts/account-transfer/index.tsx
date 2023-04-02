/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import * as styles from './account-transfer.css'

interface IAccountTransferRequiredProps {}

interface IAccountTransferOptionalProps {
	className?: string
	scrollableNode?: HTMLElement | null
	scrollTop?: number | undefined
}

interface IAccountTransferProps extends IAccountTransferRequiredProps, IAccountTransferOptionalProps {}

const defaultProps: IAccountTransferOptionalProps = {
	className: undefined,
	scrollableNode: undefined,
	scrollTop: undefined,
}

export const AccountTransfer = forwardRef<HTMLElement, IAccountTransferProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollTop, scrollableNode } = props

		return (
			<Box ref={ref} className={clsx(styles.transferWrapper, className)}>
				<Box>
					{[...Array(30)].map((_, i) => (
						// eslint-disable-next-line
						<Box key={i}>
							<Text size="xxxlarge">transfer</Text>
						</Box>
					))}
				</Box>
			</Box>
		)
	},
)

AccountTransfer.defaultProps = defaultProps
