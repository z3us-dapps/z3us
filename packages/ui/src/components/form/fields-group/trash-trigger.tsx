import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { TrashIcon } from 'ui/src/components/icons'
import Translation from 'ui/src/components/translation'

export const TrashTrigger: React.FC = () => (
	<Button
		styleVariant="tertiary"
		sizeVariant="xlarge"
		fullWidth
		leftIcon={
			<Box marginLeft="small">
				<TrashIcon />
			</Box>
		}
	>
		<Translation capitalizeFirstLetter text="form.group.remove" />
	</Button>
)
