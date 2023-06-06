/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import { useImmer } from 'use-immer'

import { Avatar } from 'ui/src/components-v2/avatar'
import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { DialogAlert } from 'ui/src/components-v2/dialog-alert'
import { Table } from 'ui/src/components-v2/table'
import { Text } from 'ui/src/components-v2/typography'
import { EditIcon, LoadingBarsIcon, PlusIcon, TrashIcon } from 'ui/src/components/icons'

interface IAddressNameCellProps {
	// TODO
	value?: any
	row?: any
}

export const AddressNameCell: React.FC<IAddressNameCellProps> = props => {
	const {
		value,
		row: { original },
	} = props

	const { id, address } = original

	return (
		<Box key={id} id={id} display="flex" alignItems="center" gap="small" style={{ minWidth: 0 }}>
			<Avatar
				src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
				alt="this is the image"
				fallback="df"
			/>
			<Box flexGrow={1} style={{ minWidth: 0 }}>
				<Text size="small" color="strong" truncate>
					{value}
				</Text>
				<Text size="xsmall" truncate>
					{address}
				</Text>
			</Box>
		</Box>
	)
}
