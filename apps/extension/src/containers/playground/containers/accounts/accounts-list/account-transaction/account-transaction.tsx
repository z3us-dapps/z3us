/* eslint-disable */
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { MagnifyingGlassIcon, PlusIcon } from 'ui/src/components/icons'
import { ScrollArea } from 'ui/src/components/scroll-area'

import * as styles from './account-transaction.css'

interface IAccountTransactionRequiredProps {}

interface IAccountTransactionOptionalProps {
	className?: number
	onClick?: () => void
	iconOnly?: boolean
}

interface IAccountTransactionProps extends IAccountTransactionRequiredProps, IAccountTransactionOptionalProps {}

const defaultProps: IAccountTransactionOptionalProps = {
	className: undefined,
	onClick: undefined,
	iconOnly: false,
}

export const AccountTransaction = forwardRef<HTMLElement, IAccountTransactionProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { iconOnly, onClick, className } = props

		return (
			<Box ref={ref} className={styles.transactionWrapper}>
				<Box padding="xxlarge">Transaction page</Box>
			</Box>
		)
	},
)

AccountTransaction.defaultProps = defaultProps
