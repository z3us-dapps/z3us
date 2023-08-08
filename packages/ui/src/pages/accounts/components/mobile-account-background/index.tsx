import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './mobile-account-background.css'

const CARD_COLORS = [
	'radial-gradient(77.21% 96.45% at 50% 100%, #FE845E 0%, #E08BAB 17.71%, #AB8CFF 50.52%, #946DFF 100%)',
	'radial-gradient(77.21% 96.45% at 50% 100%, #C0D7EF 0%, #C0D7EF 17.71%, #C0D7EF 50.52%, #C0D7EF 100%)',
	'radial-gradient(77.21% 96.45% at 50% 100%, #BF9E76 0%, #BF9E76 17.71%, #BF9E76 50.52%, #BF9E76 100%)',
]

const CARD_IMAGES = ['z3us-apple-hermes.png', 'z3us-athens.png', 'z3us-apple-hermes-v2.png']

export const MobileAccountBackground: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [cardColor, setCardColor] = useState<number>(0)

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [cardImage, setCardImage] = useState<number>(0)
	return (
		<Box
			className={styles.accountsBgCardWrapper}
			style={{
				backgroundSize: '140% auto',
				backgroundRepeat: 'no-repeat',
				backgroundImage: `url(/images/account-images/${CARD_IMAGES[cardImage]}), ${CARD_COLORS[cardColor]}`,
			}}
		/>
	)
}
