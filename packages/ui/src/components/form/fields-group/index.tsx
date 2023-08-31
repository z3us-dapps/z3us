import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { TrashIcon } from 'ui/src/components/icons'
import { ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { generateId } from 'ui/src/utils/generate-id'

interface IProps {
	name: string
	parentName?: string
	defaultKeys?: number
	trashTrigger?: React.ReactElement
	addTrigger?: React.ReactElement
}

interface IChildProps {
	parentName?: string
}

export const FieldsGroup: React.FC<PropsWithChildren<IProps>> = props => {
	const {
		parentName,
		name,
		children,
		trashTrigger = (
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
		),
		addTrigger = (
			<Button styleVariant="tertiary" sizeVariant="xlarge" fullWidth>
				<Translation capitalizeFirstLetter text="form.group.add" />
			</Button>
		),
		defaultKeys = 0,
	} = props
	const [keys, setKeys] = useState<string[]>(Array.from({ length: defaultKeys }, generateId))

	const handleRemove = (key: string) => {
		setKeys(keys.filter(k => k !== key))
	}

	const handleAdd = () => {
		setKeys([...keys, generateId()])
	}

	return (
		<>
			{keys.map((key, idx) => (
				<Box position="relative" key={key}>
					{React.Children.map(children, child => {
						if (React.isValidElement(child)) {
							return React.cloneElement(child, {
								parentName: `${parentName ? `${parentName}.` : ``}${name}[${idx}]`,
							} as Partial<IChildProps>)
						}
						return child
					})}
					{idx >= defaultKeys && (
						<ToolTip message="global.remove">
							{React.cloneElement(trashTrigger, {
								onClick: () => handleRemove(key),
							})}
						</ToolTip>
					)}
				</Box>
			))}
			{React.cloneElement(addTrigger, {
				onClick: handleAdd,
			})}
		</>
	)
}
