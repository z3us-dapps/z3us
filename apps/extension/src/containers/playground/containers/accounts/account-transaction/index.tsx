/* eslint-disable */
import React, { forwardRef, useEffect, useState } from 'react'
import { useEventListener } from 'usehooks-ts'
import { Box } from 'ui/src/components-v2/box'
import { PlusIcon, SearchIcon, Close2Icon } from 'ui/src/components/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@src/components/button'
import { useSearchParams } from 'react-router-dom'
import { ScrollArea } from 'ui/src/components-v2/scroll-area'
import { Text } from 'ui/src/components-v2/typography'
import {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from 'ui/src/components-v2/dialog'
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
		const [searchParams, setSearchParams] = useSearchParams()
		const navigate = useNavigate()
		const { pathname } = useLocation()

		const asset = searchParams.get('asset')
		const transactionId = searchParams.get('transactionId')

		const navigateBack = () => {
			navigate(pathname)
		}

		return asset && transactionId ? (
			<Dialog open>
				<DialogPortal>
					<DialogOverlay className={styles.transactionOverlay} />
					<DialogContent className={styles.transactionContent} onEscapeKeyDown={navigateBack}>
						<ScrollArea>
							<Box position="relative" padding="large">
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
								<h1>Lorum</h1>
							</Box>
						</ScrollArea>

						<Button
							className={styles.closeButton}
							styleVariant="ghost"
							sizeVariant="small"
							iconOnly
							onClick={navigateBack}
						>
							<Close2Icon />
						</Button>
					</DialogContent>
				</DialogPortal>
			</Dialog>
		) : null
	},
)

AccountTransaction.defaultProps = defaultProps
