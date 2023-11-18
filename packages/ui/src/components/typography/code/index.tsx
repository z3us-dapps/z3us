import clsx from 'clsx'
import React from 'react'

import { TextAreaAdapter as TextAreaField } from 'ui/src/components/form/fields/text-area-field'

import * as styles from './styles.css'

interface SProps {
	content: string
	onChange?: (v: string) => void
	style?: React.CSSProperties
	className?: string
}

const Code: React.FC<SProps> = ({ className, content, style, onChange }) => (
	<TextAreaField
		name="manifest"
		sizeVariant="large"
		className={clsx(styles.scrollAbsoluteWrapper, className, style)}
		value={content}
		onChange={onChange}
	/>
)

export default Code
