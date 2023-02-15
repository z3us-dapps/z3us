/* eslint-disable */
import React, { forwardRef, useEffect, useState } from 'react'
import { Box } from 'ui/src/components-v2/box'
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { PlusIcon, MagnifyingGlassIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components-v2/typography'
import clsx from 'clsx'

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
