import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { MagnifyingGlassIcon } from 'ui/src/components/icons'

interface IProps {
	title?: string
	subTitle?: string
	icon?: React.ReactNode
}

const defaultProps = {
	title: 'No results found',
	subTitle: 'please refine search',
	icon: <MagnifyingGlassIcon />,
}

export const NoResultsPlaceholder: React.FC<IProps> = ({ title, subTitle, icon, ...rest }) => (
	<Box
		display="flex"
		flexDirection="column"
		gap="small"
		height="full"
		alignItems="center"
		justifyContent="center"
		{...rest}
	>
		<Box display="flex" alignItems="center" gap="small">
			<>
				<Text size="xlarge" weight="strong">
					{title}
				</Text>
				{icon || null}
			</>
		</Box>
		<Text>{subTitle}</Text>
	</Box>
)

NoResultsPlaceholder.defaultProps = defaultProps
