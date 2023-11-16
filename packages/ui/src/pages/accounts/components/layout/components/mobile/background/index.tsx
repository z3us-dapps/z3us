import React from 'react'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CARD_COLORS } from 'ui/src/constants/account'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useAddressBook } from 'ui/src/hooks/use-address-book'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'

import * as styles from './styles.css'

export const MobileBackground: React.FC = () => {
	const isAllAccounts = useIsAllAccounts()
	const accounts = useWalletAccounts()

	const { accountId, resourceId } = useParams()
	const accountAddress = accounts?.[accountId]?.address
	const addressBook = useAddressBook()
	const account = addressBook[accountAddress]

	// TODO:
	// const cardImage = CARD_IMAGES?.[account?.cardImage]
	const cardColor = CARD_COLORS?.[account?.cardColor]

	return (
		<Box
			className={styles.accountsBgCardWrapper}
			style={{
				...(!isAllAccounts && !resourceId
					? {
							backgroundSize: '170% auto',
							backgroundRepeat: 'no-repeat',
							backgroundImage: `${cardColor}`,
							// backgroundImage: `url(/images/account-images/${cardImage}), ${cardColor}`,
							opacity: '0.9',
					  }
					: {}),
			}}
		/>
	)
}
