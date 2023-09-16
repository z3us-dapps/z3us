import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { generateId } from 'ui/src/utils/generate-id'

import { AddTrigger } from './add-trigger'
import { GroupField } from './group-field'
import { TrashTrigger } from './trash-trigger'

const messages = defineMessages({
	remove: {
		id: 'form.field_group.remove',
		defaultMessage: 'Remove',
	},
})

interface IProps {
	name: string
	defaultKeys?: number
	trashTrigger?: React.ReactElement
	addTrigger?: React.ReactElement
}

export const FieldsGroup: React.FC<PropsWithChildren<IProps>> = props => {
	const intl = useIntl()
	const { name, children, trashTrigger = <TrashTrigger />, addTrigger = <AddTrigger />, defaultKeys = 0 } = props
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
					<GroupField idx={idx} name={name}>
						{children}
					</GroupField>
					{idx >= defaultKeys && (
						<ToolTip message={intl.formatMessage(messages.remove)}>
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
