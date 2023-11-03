import React, { useContext } from 'react'

import { Box } from 'ui/src/components/box'
import { type IButtonProps } from 'ui/src/components/button'
import { LoadingBarsIcon } from 'ui/src/components/icons'

import { FormContext } from '../../context'

interface IProps {
	children: React.ReactElement<IButtonProps>
}

export const SubmitButton: React.FC<IProps> = ({ children }) => {
	const { isLoading } = useContext(FormContext)

	return (
		<>
			{React.Children.map(children, child =>
				React.isValidElement(child)
					? React.cloneElement(child, {
							type: 'submit',
							disabled: isLoading,
							rightIcon: isLoading ? (
								<Box marginLeft="small">
									<LoadingBarsIcon />
								</Box>
							) : null,
					  } as Partial<any>)
					: child,
			)}
		</>
	)
}
