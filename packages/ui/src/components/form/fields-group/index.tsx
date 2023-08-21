import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { CirclePlusIcon, TrashIcon } from 'ui/src/components/icons'
import Translation from 'ui/src/components/translation'
import { generateId } from 'ui/src/utils/generate-id'

interface IProps {
	name: string
	parentName?: string
}

interface IChildProps {
	parentName?: string
}

export const FieldsGroup: React.FC<PropsWithChildren<IProps>> = ({ parentName, name, children }) => {
	const [keys, setKeys] = useState<string[]>([])

	const handleRemove = (key: string) => () => {
		setKeys(keys.filter(k => k !== key))
	}

	const handleAdd = () => {
		setKeys([...keys, generateId()])
	}

	return (
		<Box>
			<Box width="full" paddingTop="large">
				{keys.map((key, idx) => (
					<Box key={key}>
						{React.Children.map(children, child => {
							if (React.isValidElement(child)) {
								return React.cloneElement(child, {
									parentName: `${parentName ? `${parentName}.` : ``}${name}[${idx}]`,
								} as Partial<IChildProps>)
							}
							return child
						})}

						<Button
							styleVariant="tertiary"
							sizeVariant="xlarge"
							fullWidth
							onClick={handleRemove(key)}
							leftIcon={
								<Box marginLeft="small">
									<TrashIcon />
								</Box>
							}
						>
							<Translation capitalizeFirstLetter text="form.group.remove" />
						</Button>
					</Box>
				))}
			</Box>
			<Box width="full" paddingTop="large">
				<Button
					styleVariant="tertiary"
					sizeVariant="xlarge"
					fullWidth
					onClick={handleAdd}
					leftIcon={
						<Box marginLeft="small">
							<CirclePlusIcon />
						</Box>
					}
				>
					<Translation capitalizeFirstLetter text="form.group.add" />
				</Button>
			</Box>
		</Box>
	)
}
