import { LeftArrowIcon } from 'packages/ui/src/components/icons'
import React from 'react'
import { useParams } from 'react-router-dom'

import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'

export const BackButton: React.FC = () => {
	const { accountId } = useParams()

	return (
		<ToolTip message="global.back">
			<Button to={`/accounts/${accountId}`} styleVariant="white-transparent" sizeVariant="small" iconOnly>
				<LeftArrowIcon />
			</Button>
		</ToolTip>
	)
}
