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
  <div className={clsx('px-5', className && className)}>
    <div className="container mx-auto" style={{ maxWidth: '1174px' }}>
      {children}
    </div>
  </div>
)

PageContainer.defaultProps = defaultProps
