import type { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { Check2Icon, Close2Icon } from 'ui/src/components/icons'

import * as styles from './styles.css'

type TStatusType = CommittedTransactionInfo['transaction_status']

interface IProps {
	className?: string
	size?: 'small' | 'medium' | 'large'
	statusType: TStatusType
}

const getIconByType = (type: TStatusType) => {
	const iconMap = {
		CommittedSuccess: <Check2Icon />,
		CommittedFailure: <Close2Icon />,
	}
	return (type && iconMap[type]) || null
}

export const TransactionStatusIcon = forwardRef<HTMLElement, IProps>((props, ref: React.Ref<HTMLElement | null>) => {
	const { className, size = 'medium', statusType } = props

	const icon = getIconByType(statusType)
	const isTypeSuccess = statusType === 'CommittedSuccess'
	const isTypeFailure = statusType === 'CommittedFailure'

	return (
		<Box
			ref={ref}
			className={clsx(
				styles.transactionStatusIconWrapper,
				size === 'medium' && styles.transactionStatusIconMediumWrapper,
				size === 'small' && styles.transactionStatusIconSmallWrapper,
				isTypeSuccess && styles.transactionStatusSuccess,
				isTypeFailure && styles.transactionStatusFailure,
				className,
			)}
		>
			{icon}
		</Box>
	)
})
