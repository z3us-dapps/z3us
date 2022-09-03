import { ReactNode } from 'react'

export interface IPageContainer {
	children: ReactNode | undefined
}

export const PageContainer = ({ children }: IPageContainer) => (
		<div className="px-5">
			<div className="container mx-auto" style={{ maxWidth: '1174px' }}>
				{children}
			</div>
		</div>
	)
