import React from 'react'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CARD_COLORS, CARD_IMAGES } from 'ui/src/constants/account'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useAddressBook } from 'ui/src/hooks/use-address-book'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'

import * as styles from './styles.css'

export const MobileBackground: React.FC = () => {
	const isAllAccounts = useIsAllAccounts()
	const accounts = useWalletAccounts()
	const { accountId } = useParams()
	const accountAddress = accounts?.[accountId]?.address
	const addressBook = useAddressBook()
	const account = addressBook[accountAddress]

	return (
		<Box
			className={styles.accountsBgCardWrapper}
			style={{
				...(!isAllAccounts
					? {
							backgroundSize: '170% auto',
							backgroundRepeat: 'no-repeat',
							backgroundImage: `url(/images/account-images/${account?.cardImage || CARD_IMAGES[0]}), ${
								account?.cardColor || CARD_COLORS[0]
							}`,
							opacity: '0.9',
					  }
					: {}),
			}}
		/>
	)
}
