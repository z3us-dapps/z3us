import NLink from 'next/link'
import React, { forwardRef } from 'react'

import { Button, type IButtonProps } from 'ui/src/components/button'

interface INextButtonProps extends IButtonProps {
	to?: string
}

export const NextButton = forwardRef<HTMLButtonElement, INextButtonProps>(
	(props, ref: React.Ref<HTMLButtonElement | null>) => {
		const { to } = props

		return <Button ref={ref} href={to} linkFrameWorkComp={NLink} {...props} />
	},
)
