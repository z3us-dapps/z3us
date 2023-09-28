import { ReactNode, memo } from 'react'
import { createPortal } from 'react-dom'

import { Box } from 'ui/src/components/box'

export interface IProps {
	show: boolean
	children: ReactNode
	header?: ReactNode
	footer?: ReactNode
	closeOnTap?: boolean
	onClose?: () => void
}

export const ModalContainer = memo((props: IProps) => {
	const { header, footer, closeOnTap, onClose, children } = props

	const root = document.getElementById('modals')
	if (!root) throw new Error('Modals root node not found. Cannot render modal.')

	const handleInsideClick: React.MouseEventHandler<HTMLDivElement> = event => {
		if (!closeOnTap) {
			event.stopPropagation()
		}
	}

	return createPortal(
		<Box onClick={onClose}>
			<Box onClick={handleInsideClick}>
				{header && <Box>{header}</Box>}
				<Box>{children}</Box>
				{footer && <Box>{footer}</Box>}
			</Box>
		</Box>,
		root,
	)
})
