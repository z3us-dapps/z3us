import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from 'ui/src/components-v2/avatar'
import { Box } from 'ui/src/components-v2/box'
import { DownLeftIcon, UpRightIcon } from 'ui/src/components/icons'

import * as styles from './transaction-icon.css'

export type TTransactionTypes = 'deposit' | 'send'

const getIconByType = (type: TTransactionTypes) => {
	const iconMap = {
		deposit: <DownLeftIcon />,
		send: <UpRightIcon />,
	}
	return iconMap[type] || null
}

interface ITransactionIconRequiredProps {}

interface ITransactionIconOptionalProps {
	className?: string
	transactionType?: 'deposit' | 'send'
}

interface ITransactionIconProps extends ITransactionIconRequiredProps, ITransactionIconOptionalProps {}

const defaultProps: ITransactionIconOptionalProps = {
	className: undefined,
	transactionType: undefined,
}

export const TransactionIcon = forwardRef<HTMLElement, ITransactionIconProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, transactionType } = props

		const icon = getIconByType(transactionType)

		return (
			<Box ref={ref} className={clsx(styles.transactionIconWrapper, className)}>
				<Avatar>
					<AvatarImage
						className={styles.transactionAvatar}
						src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
						alt="Colm Tuite"
					/>
					<AvatarFallback className="AvatarFallback" delayMs={600}>
						CT
					</AvatarFallback>
				</Avatar>
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
