/* eslint-disable */
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useEventListener } from 'usehooks-ts'

import { Box } from 'ui/src/components-v2/box'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
} from 'ui/src/components-v2/dialog'
import { ScrollArea } from 'ui/src/components-v2/scroll-area'
import { Text } from 'ui/src/components-v2/typography'
import { Close2Icon, PlusIcon, SearchIcon, ShareIcon, ArrowDownIcon, ArrowUpIcon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'

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

		// TODO: move to constants
		const asset = searchParams.get('asset')
		const transactionId = searchParams.get('transactionId')
		const isActivityLink = searchParams.get('activity')

		const navigateBack = () => {
			navigate(`${pathname}${isActivityLink ? '?activity=true' : ''}`)
		}

		return asset && transactionId ? (
			<Dialog open>
				<DialogPortal>
					<DialogOverlay className={styles.transactionOverlay} />
					<DialogContent className={styles.transactionContent} onEscapeKeyDown={navigateBack}>
						<ScrollArea>
							<Box className={styles.transactionBodyScrollWrapper}>
								{[...Array(50)].map((x, i) => (
									<h1 key={i}>Lorum transaction</h1>
								))}
							</Box>
						</ScrollArea>
						<Box className={styles.transactionHeaderWrapper}>
							<Box flexGrow={1}>
								<Button
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to="https://explorer.radixdlt.com/"
									target="_blank"
								>
									<ArrowUpIcon />
								</Button>
								<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={navigateBack}>
									<ArrowDownIcon />
								</Button>
							</Box>
							<Box flexGrow={1} display="flex" justifyContent="flex-end">
								<Button
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to="https://explorer.radixdlt.com/"
									target="_blank"
								>
									<ShareIcon />
								</Button>
								<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={navigateBack}>
									<Close2Icon />
								</Button>
							</Box>
						</Box>
					</DialogContent>
				</DialogPortal>
			</Dialog>
		) : null
	},
)

AccountTransaction.defaultProps = defaultProps
