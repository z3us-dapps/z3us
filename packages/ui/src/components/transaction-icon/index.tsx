import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { DownLeft2Icon, UpRight2Icon } from 'ui/src/components/icons'
import { type IResourceImageIconProps, ResourceImageIcon } from 'ui/src/components/resource-image-icon'

import * as styles from './styles.css'

export type TTransactionTypes = 'deposit' | 'withdraw' | undefined

const getIconByType = (type: TTransactionTypes) => {
	const iconMap = {
		deposit: <DownLeft2Icon />,
		withdraw: <UpRight2Icon />,
	}
	return (type && iconMap[type]) || null
}

interface IProps extends IResourceImageIconProps {
	className?: ClassValue
	transactionType?: TTransactionTypes
}

export const TransactionIcon = forwardRef<HTMLElement, IProps>((props, ref: React.Ref<HTMLElement | null>) => {
	const { className, transactionType, ...rest } = props

	const icon = getIconByType(transactionType)

	return (
		<Box ref={ref} className={clsx(styles.transactionIconWrapper, className)}>
			<ResourceImageIcon {...rest} />
			{icon ? (
				<Box
					className={clsx(
						styles.transactionTypeWrapper,
						transactionType === 'withdraw' && styles.transactionTypeRed,
						transactionType === 'deposit' && styles.transactionTypeGreen,
					)}
				>
					{icon}
				</Box>
			) : null}
		</Box>
	)
})
