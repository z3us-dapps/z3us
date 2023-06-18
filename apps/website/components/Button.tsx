'use client'

// import { block } from "million/react";
import React from 'react'

import * as styles from './Button.css'

// eslint-disable-next-line arrow-body-style
const ButtonComp: React.FC = ({ children, onClick }: { children: any; onClick: () => void }) => {
	return (
		// eslint-disable-next-line react/button-has-type
		<button className={styles.button} onClick={onClick}>
			<div>{children}</div>
		</button>
	)
}

// const Button = block(ButtonComp);

export default ButtonComp
