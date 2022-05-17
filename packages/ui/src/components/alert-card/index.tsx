/* eslint-disable react/jsx-props-no-spreading */
import React, { useImperativeHandle, useRef } from 'react'
import { Cross2Icon, ExclamationTriangleIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { CSS } from '../../theme'
import { __DEV__ } from '../../utils/assertion'
import { Box } from '../atoms/box'
import Button from '../button'
import { StyledAlertCard, AlertCardVariantsProps } from './alert-card.styles'

export interface Props {
	as?: keyof JSX.IntrinsicElements
	icon?: React.ReactNode | boolean
	onClose?: () => void
	css?: CSS
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>

export type AlertCardProps = Props & NativeAttrs & AlertCardVariantsProps & { css?: CSS }

const AlertCard = React.forwardRef<HTMLDivElement, React.PropsWithChildren<AlertCardProps>>(
	({ children, as, css, icon, onClose, color, ...rest }, ref: React.Ref<HTMLDivElement | null>) => {
		const cardRef = useRef<HTMLDivElement>(null)
		useImperativeHandle(ref, () => cardRef.current)
		const isIconBool = typeof icon === 'boolean'

		return (
			<StyledAlertCard ref={cardRef} as={as} color={color} css={{ ...(css as any) }} {...rest}>
				{icon ? (
					<Box css={{ width: '15px', height: '15px', mt: '1px', ml: '$2' }}>
						{isIconBool ? (
							<>
								{(() => {
									switch (color) {
										case 'success':
											return <CheckCircledIcon />
										case 'error':
											return <CrossCircledIcon />
										case 'warning':
											return <ExclamationTriangleIcon />
										default:
											return null
									}
								})()}
							</>
						) : (
							icon
						)}
					</Box>
				) : null}
				{children}
				{onClose ? (
					<Button
						color="ghost"
						iconOnly
						aria-label="wallet options"
						size="1"
						css={{ flexShrink: 0, mt: '2px', mr: '2px' }}
						onClick={() => onClose()}
					>
						<Cross2Icon />
					</Button>
				) : null}
			</StyledAlertCard>
		)
	},
)

if (__DEV__) {
	AlertCard.displayName = 'z3usUI - Alert card'
}

AlertCard.toString = () => '.z3us alert card'

AlertCard.defaultProps = {
	as: 'div',
	icon: false,
	onClose: undefined,
	css: undefined,
}

export default AlertCard
