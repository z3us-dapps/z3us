import React from 'react'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Link, Text } from 'ui/src/components/typography'
import { getFieldValue } from 'ui/src/services/metadata'

import * as styles from './styles.css'

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/

interface IProps {
	field?: any
}

const FieldValue: React.FC<IProps> = ({ field }) => {
	const value = getFieldValue(field)
	const isLinkValue = urlRegex.test(value)
	return (
		<ToolTip message={value}>
			<Box maxWidth="full">
				{isLinkValue ? (
					<Link target="_blank" href={value} className={styles.metaDataLinkWrapper}>
						<Text size="xsmall" truncate>
							{value}
						</Text>
					</Link>
				) : (
					<Text size="xsmall" truncate>
						{value}
					</Text>
				)}
			</Box>
		</ToolTip>
	)
}

export default FieldValue
