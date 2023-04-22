import * as AvatarPrimitive from '@radix-ui/react-avatar'
import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'

import { AvatarFallback, AvatarImage } from 'ui/src/components-v2/avatar'
import { Box } from 'ui/src/components-v2/box'
import { DownLeftIcon, UpRightIcon } from 'ui/src/components/icons'

import * as styles from './transaction-icon.css'

export type TTransactionTypes = 'deposit' | 'send'
export type TTransactionIconSizes = 'small' | 'medium'

const getIconByType = (type: TTransactionTypes) => {
	const iconMap = {
		deposit: <DownLeftIcon />,
		send: <UpRightIcon />,
	}
	return iconMap[type] || null
}

interface ITransactionIconRequiredProps {}

interface ITransactionIconOptionalProps {
	className?: ClassValue
	transactionType?: TTransactionTypes
	transactionIconSize?: TTransactionIconSizes
	// typeof vars.text.medium
	// TODO: this type needs to reference our colors
	transactionIconBorderColor?: any
	transactionIconShadow?: boolean
}

interface ITransactionIconProps extends ITransactionIconRequiredProps, ITransactionIconOptionalProps {}

const defaultProps: ITransactionIconOptionalProps = {
	className: undefined,
	transactionType: undefined,
	transactionIconSize: 'small',
	transactionIconBorderColor: 'borderDivider',
	transactionIconShadow: false,
}

export const TransactionIcon = forwardRef<HTMLElement, ITransactionIconProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, transactionType, transactionIconSize, transactionIconBorderColor, transactionIconShadow } = props

		const icon = getIconByType(transactionType)
		const isMediumIcon = transactionIconSize === 'medium'

		return (
			<Box
				ref={ref}
				borderColor={transactionIconBorderColor}
				className={clsx(
					styles.transactionIconWrapper,
					isMediumIcon && styles.transactionIconMediumWrapper,
					transactionIconShadow && styles.transactionIconShadowWrapper,
					className,
				)}
			>
				<AvatarPrimitive.Root className={styles.transactionAvatarRootWrapper}>
					<AvatarImage
						className={styles.transactionAvatarWrapper}
						src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
						alt="Colm Tuite"
					/>
					<AvatarFallback delayMs={600} className={styles.transactionAvatarFallbackWrapper}>
						CT
					</AvatarFallback>
				</AvatarPrimitive.Root>
				{icon ? (
					<Box className={styles.transactionTypeWrapper}>
						<UpRightIcon />
					</Box>
				) : null}
			</Box>
		)
	},
)

TransactionIcon.defaultProps = defaultProps
