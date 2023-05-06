/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Button, TStyleVariant } from 'ui/src/components-v2/button'
import { Text } from 'ui/src/components-v2/typography'

import * as containerStyles from '@src/components/styles/container-styles.css'

import * as styles from './account-transfer.css'

interface IAccountTransferRequiredProps {}

interface IAccountTransferOptionalProps {
	className?: string
	scrollableNode?: HTMLElement | null
}

interface IAccountTransferProps extends IAccountTransferRequiredProps, IAccountTransferOptionalProps {}

const defaultProps: IAccountTransferOptionalProps = {
	className: undefined,
	scrollableNode: undefined,
}

export const AccountTransfer = forwardRef<HTMLElement, IAccountTransferProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollableNode } = props
		// containerStyles.containerWrapper
		// containerStyles.containerInnerWrapper

		return (
			<Box ref={ref} className={clsx(styles.transferWrapper, className)}>
				<Box className={styles.transferFlexColWrapper}>
					<Text size="xxxlarge" weight="strong" color="strong">
						Send
					</Text>

					<Text size="medium">From</Text>
					<Text size="medium">To</Text>
					<Button styleVariant="primary" sizeVariant="xlarge">
						Next
					</Button>

					{/* {[...Array(30)].map((_, i) => ( */}
					{/* 	// eslint-disable-next-line */}
					{/* 	<Box key={i}> */}
					{/* 		<Text size="xxxlarge">transfer</Text> */}
					{/* 	</Box> */}
					{/* ))} */}
				</Box>
			</Box>
		)
	},
)

AccountTransfer.defaultProps = defaultProps
