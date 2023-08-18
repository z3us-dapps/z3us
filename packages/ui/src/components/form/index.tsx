import type { PropsWithChildren } from 'react'
import React from 'react'

interface IProps {
	onSubmit: (event: React.FormEvent) => void
}

export const Form: React.FC<PropsWithChildren<IProps>> = ({ children, onSubmit, ...rest }) => {
	const handleSubmit = (e: React.FormEvent) => {
		onSubmit(e)
	}

	return (
		<form {...rest} onSubmit={handleSubmit}>
			{children}
		</form>
	)
}
