import Image from 'next/image'
import React from 'react'

import * as styles from './logo-test.css'

// eslint-disable-next-line react/function-component-definition
export default function LogoTest() {
	return (
		<div className={styles.container}>
			<Image priority src="/vercel.svg" width={100} height={120} alt="Vanilla Extract logo" />
		</div>
	)
}
