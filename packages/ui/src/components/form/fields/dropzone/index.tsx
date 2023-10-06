import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import React, { forwardRef, useEffect } from 'react'
import type { DropzoneOptions } from 'react-dropzone'
import { useDropzone } from 'react-dropzone'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'
import * as styles from './dropzone.css'

interface IAdapterProps {
	className?: ClassValue
	title?: any
	options?: DropzoneOptions
	onChange?: (value: File[]) => void
}
export const DropzoneAdapter = forwardRef<HTMLInputElement, IAdapterProps>(
	({ className, title, onChange, options }, ref) => {
		const { acceptedFiles, getRootProps, getInputProps } = useDropzone(options)

		const files = acceptedFiles.map((file: any) => (
			<Box component="li" key={file.path}>
				{file.path} - {file.size} bytes
			</Box>
		))

		useEffect(() => {
			onChange(acceptedFiles)
		}, [acceptedFiles])

		return (
			<Box className={clsx(styles.dropZoneWrapper, className)}>
				<Box {...getRootProps({ className: styles.dropZoneAreaWrapper })}>
					<input ref={ref} {...getInputProps()} />
					<Text>{title}</Text>
				</Box>
				<Box component="aside">
					<Text>Files</Text>
					<Box component="ul">{files}</Box>
				</Box>
			</Box>
		)
	},
)

interface IProps extends Omit<IAdapterProps, 'onChange'>, WrapperProps {}

export const Dropzone = forwardRef<HTMLInputElement, IProps>(({ validate, name, label, ...rest }, ref) => (
	<FieldWrapper name={name} label={label} validate={validate}>
		<DropzoneAdapter {...rest} ref={ref} />
	</FieldWrapper>
))

export default Dropzone
