import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import React from 'react'
import { useDropzone } from 'react-dropzone'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './dropzone.css'

interface IAccountCardsProps {
	className?: ClassValue
	title?: any
}

export const Dropzone: React.FC<IAccountCardsProps> = props => {
	const { className, title } = props
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

	// TODO: fix any
	const files = acceptedFiles.map((file: any) => (
		<Box component="li" key={file.path}>
			{file.path} - {file.size} bytes
		</Box>
	))

	return (
		<Box className={clsx(styles.dropZoneWrapper, className)}>
			<Box {...getRootProps({ className: styles.dropZoneAreaWrapper })}>
				<input {...getInputProps()} />
				<Text>{title}</Text>
			</Box>
			<Box component="aside">
				<Text>Files</Text>
				<Box component="ul">{files}</Box>
			</Box>
		</Box>
	)
}
