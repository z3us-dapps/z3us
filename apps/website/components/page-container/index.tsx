import React, { ReactNode } from 'react'
import clsx from 'clsx'

export interface IPageContainer {
	children: ReactNode | undefined
	className?: string | undefined
}

const defaultProps = {
	className: undefined,
}

export const PageContainer = ({ children, className }: IPageContainer) => (
	<div className={clsx('z3-container', className && className)}>{children}</div>
)

PageContainer.defaultProps = defaultProps
