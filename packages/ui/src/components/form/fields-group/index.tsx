import get from 'lodash/get'
import type { PropsWithChildren } from 'react'
import React, { useContext, useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { generateId } from 'ui/src/utils/generate-id'

import { ValidationErrorMessage } from '../../validation-error-message'
import { FormContext } from '../context'
import { FieldContext } from '../field-wrapper/context'
import { AddTrigger } from './add-trigger'
import { GroupField } from './group-field'
import { TrashTrigger } from './trash-trigger'

const messages = defineMessages({
	remove: {
		id: 'G/yZLu',
		defaultMessage: 'Remove',
	},
})

interface IProps {
	name: string
	defaultKeys?: number
	className?: string
	trashTrigger?: React.ReactElement
	addTrigger?: React.ReactElement
	ignoreTriggers?: boolean
}

type State = {
	keys: string[]
	error: string
}

export const FieldsGroup: React.FC<PropsWithChildren<IProps>> = props => {
	const intl = useIntl()
	const {
		name,
		children,
		className,
		trashTrigger = <TrashTrigger />,
		addTrigger = <AddTrigger />,
		defaultKeys = 0,
		ignoreTriggers,
	} = props
	const { values, errors, onFieldChange } = useContext(FormContext)
	const { name: parentName } = useContext(FieldContext)
	const fieldName = `${parentName ? `${parentName}.` : ''}${name}`

	const [state, setState] = useImmer<State>({
		keys: Array.from({ length: get(values, fieldName)?.length || defaultKeys }, generateId),
		error: '',
	})

	useEffect(() => {
		setState(draft => {
			// eslint-disable-next-line no-underscore-dangle
			const fieldErrors = get(errors, fieldName)?._errors || []
			draft.error = fieldErrors.length > 0 ? fieldErrors[0] : ''
		})
	}, [errors])

	const handleRemove = (key: string) => {
		const idx = state.keys.findIndex(k => k === key)
		if (idx > -1) {
			const value = get(values, fieldName)
			const v = [...(value || [])]
			v.splice(idx, 1)
			onFieldChange(fieldName, v)
		}

		setState(draft => {
			draft.keys = draft.keys.filter(k => k !== key)
			draft.error = ''
		})
	}

	const handleAdd = () => {
		setState(draft => {
			draft.keys = [...draft.keys, generateId()]
			draft.error = ''
		})
	}

	return (
		<Box>
			{state.keys.map((key, idx) => (
				<Box className={className} position="relative" key={key}>
					<GroupField idx={idx} name={name}>
						{children}
					</GroupField>
					{!ignoreTriggers && idx >= defaultKeys && (
						<ToolTip message={intl.formatMessage(messages.remove)}>
							{React.cloneElement(trashTrigger, {
								onClick: () => handleRemove(key),
							})}
						</ToolTip>
					)}
				</Box>
			))}
			<Box display="flex" justifyContent="space-between">
				<ValidationErrorMessage message={state.error} />
			</Box>
			{!ignoreTriggers && React.cloneElement(addTrigger, { onClick: handleAdd })}
		</Box>
	)
}
