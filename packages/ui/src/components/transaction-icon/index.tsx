import * as AvatarPrimitive from '@radix-ui/react-avatar'
import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { DownLeftIcon, UpRightIcon } from 'ui/src/components/icons'
import { type TThemeColorKey } from 'ui/src/components/system/theme.css'
import { Text } from 'ui/src/components/typography'

import * as styles from './transaction-icon.css'

export type TTransactionTypes = 'deposit' | 'send' | undefined
export type TTransactionIconSizes = 'small' | 'medium' | 'large'

const getIconByType = (type: TTransactionTypes) => {
	const iconMap = {
		deposit: <DownLeftIcon />,
		send: <UpRightIcon />,
	}
	return (type && iconMap[type]) || null
}

interface ITransactionIconRequiredProps {}

interface ITransactionIconOptionalProps {
	className?: ClassValue
	transactionType?: TTransactionTypes
	transactionIconSize?: TTransactionIconSizes
	transactionIconBorderColor?: TThemeColorKey
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
		const isLargeIcon = transactionIconSize === 'large'

		return (
			<Box
				ref={ref}
				borderColor={transactionIconBorderColor}
				className={clsx(
					styles.transactionIconWrapper,
					isMediumIcon && styles.transactionIconMediumWrapper,
					isLargeIcon && styles.transactionIconLargeWrapper,
					transactionIconShadow && styles.transactionIconShadowWrapper,
					className,
				)}
			>
				<AvatarPrimitive.Root className={styles.transactionAvatarRootWrapper}>
					<AvatarPrimitive.Image
						className={styles.transactionAvatarImageWrapper}
						src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
						alt="Colm Tuite"
					/>
					<AvatarPrimitive.Fallback delayMs={600} className={styles.transactionAvatarFallbackWrapper}>
						<Text>CT</Text>
					</AvatarPrimitive.Fallback>
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
