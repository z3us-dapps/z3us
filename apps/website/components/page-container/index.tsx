import clsx from 'clsx'
import type { ReactNode } from 'react';
import React from 'react'

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
