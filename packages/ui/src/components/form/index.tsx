import type { FormEvent, PropsWithChildren } from 'react'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import Translation from 'ui/src/components/translation'

import { LoadingBarsIcon } from '../icons'

interface IProps {
	onSubmit: (event: React.FormEvent) => void
}

export const Form: React.FC<PropsWithChildren<IProps>> = ({ children, onSubmit, ...rest }) => {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		onSubmit(e)
	}

	const isLoading = false // @TODO

	return (
		<form {...rest} onSubmit={handleSubmit}>
			{children}

			<Box display="flex" paddingTop="xlarge" width="full">
				<Button
					styleVariant="primary"
					sizeVariant="xlarge"
					type="submit"
					disabled={isLoading}
					rightIcon={
						isLoading ? (
							<Box marginLeft="small">
								<LoadingBarsIcon />
							</Box>
						) : null
					}
				>
					<Translation capitalizeFirstLetter text="global.submit" />
				</Button>
			</Box>
		</form>
	)
}
