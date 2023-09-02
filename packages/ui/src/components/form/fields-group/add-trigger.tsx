import React from 'react'

import { Button } from 'ui/src/components/button'
import Translation from 'ui/src/components/translation'

export const AddTrigger: React.FC = () => (
	<Button styleVariant="tertiary" sizeVariant="xlarge" fullWidth>
		<Translation capitalizeFirstLetter text="form.group.add" />
	</Button>
)
