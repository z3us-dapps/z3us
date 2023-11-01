import { QRCodeSVG } from 'qrcode.react'
import React from 'react'

import * as styles from './styles.css'

interface IProps {
	value: string
	size?: number
}

export const QrStyled: React.FC<IProps> = props => {
	const { value, size = 180 } = props

	return <QRCodeSVG value={value} size={size} className={styles.qrPopOverCode} />
}
