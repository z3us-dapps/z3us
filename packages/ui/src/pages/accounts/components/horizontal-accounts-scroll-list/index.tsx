import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { AppsIcon } from 'ui/src/components/icons'
import {
	ScrollAreaRoot,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
	ScrollAreaViewport,
} from 'ui/src/components/scroll-area-radix'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'

import { AccountHomeCard } from '../account-home-card'
import { AddAccountDialog } from '../layout/components/add-account-dialog'
import * as styles from './styles.css'

const messages = defineMessages({
	addAccountToolTip: {
		defaultMessage: 'Add account',
		id: 'qJcduu',
	},
})

interface IProps {
	horizontalScrollWidth: number
}

export const HorizontalAccountsScrollList: React.FC<IProps> = props => {
	const { horizontalScrollWidth } = props
	const scrollRef = useRef(null)

	const intl = useIntl()
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const { accountId = '-' } = useParams()
	const isAllAccounts = accountId === '-'

	const accounts = useWalletAccounts()
	const activeAccountIndex = Object.values(accounts).findIndex(({ address }) => address === accountId)

	useEffect(() => {
		const scrollElem = scrollRef.current
		if (scrollElem && activeAccountIndex > 0 && !isMounted) {
			scrollElem.scrollTo({ left: 336 * activeAccountIndex })
			setIsMounted(true)
		}
	}, [scrollRef.current, activeAccountIndex, isMounted])

	return (
		<Box className={styles.accountsHorizontalWrapper}>
			<AddAccountDialog
				dialogTrigger={
					<Box className={styles.accountsAddAccountButton}>
						<ToolTip message={intl.formatMessage(messages.addAccountToolTip)}>
							<Button styleVariant="ghost" sizeVariant="small" iconOnly>
								<AppsIcon />
							</Button>
						</ToolTip>
					</Box>
				}
			/>
			<Box className={styles.accountsHorizontalAbsoluteWrapper}>
				<ScrollAreaRoot style={{ maxWidth: `${horizontalScrollWidth}px`, width: '100%' }}>
					<ScrollAreaViewport ref={scrollRef}>
						<Box className={styles.accountsHorizontalCardsWrapper}>
							{Object.values(accounts).map(({ address }) => (
								<AccountHomeCard
									key={address}
									address={address}
									className={clsx(!isAllAccounts && address !== accountId && styles.accountCardOpacity)}
								/>
							))}
						</Box>
					</ScrollAreaViewport>
					<ScrollAreaScrollbar orientation="horizontal">
						<ScrollAreaThumb />
					</ScrollAreaScrollbar>
				</ScrollAreaRoot>
			</Box>
		</Box>
	)
}

export default HorizontalAccountsScrollList
