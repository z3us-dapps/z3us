import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { CARD_COLORS, CARD_IMAGES } from 'ui/src/constants/account'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'

import * as styles from './styles.css'

export const MobileBackground: React.FC = () => {
	const [cardColor] = useState<number>(0)
	const [cardImage] = useState<number>(0)

	const isAllAccounts = useIsAllAccounts()

	return (
		<Box
			className={styles.accountsBgCardWrapper}
			style={{
				...(!isAllAccounts
					? {
							backgroundSize: '170% auto',
							backgroundRepeat: 'no-repeat',
							backgroundImage: `url(/images/account-images/${CARD_IMAGES[cardImage]}), ${CARD_COLORS[cardColor]}`,
					  }
					: {}),
			}}
		/>
	)
}
