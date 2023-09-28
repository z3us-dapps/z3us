import { ReactNode, memo } from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './styles.css'

export interface IProps {
	show: boolean
	children: ReactNode
	header?: ReactNode
	footer?: ReactNode
	closeOnTap?: boolean
	onClose?: () => void
}

export const ModalContainer = memo(({ show, header, footer, closeOnTap, onClose, children }: IProps) => {
	const handleInsideClick: React.MouseEventHandler<HTMLDivElement> = event => {
		if (closeOnTap) event.stopPropagation()
	}
	const handleOutsideClick: React.MouseEventHandler<HTMLDivElement> = event => {
		if (closeOnTap) onClose()
	}

	return (
		<Box onClick={handleOutsideClick} className={!show ? styles.hidden : undefined}>
			<Box onClick={handleInsideClick}>
				{header && <Box>{header}</Box>}
				<Box>{children}</Box>
				{footer && <Box>{footer}</Box>}
			</Box>
		</Box>
	)
})
