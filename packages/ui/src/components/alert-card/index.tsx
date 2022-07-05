/* eslint-disable react/jsx-props-no-spreading */
import React, { PropsWithoutRef, RefAttributes, useImperativeHandle, useRef } from 'react'
import { Cross2Icon, ExclamationTriangleIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { CSS } from '../../theme'
import withDefaults from '../../utils/with-defaults'
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

export type AlertCardProps = Props & NativeAttrs & AlertCardVariantsProps

const defaultProps: Partial<AlertCardProps> = {
	as: 'div' as keyof JSX.IntrinsicElements,
	icon: false,
	onClose: undefined,
	css: undefined,
}

const AlertCard = React.forwardRef<HTMLDivElement, React.PropsWithRef<React.PropsWithChildren<AlertCardProps>>>(
	({ children, as, css, icon, onClose, color, ...rest }, ref) => {
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

type CardComponent<T, P = {}> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> & {
	Image: typeof Image
}

if (__DEV__) {
	AlertCard.displayName = 'z3usUI - Alert card'
}

AlertCard.toString = () => '.z3us alert card'

export default withDefaults(AlertCard, defaultProps) as CardComponent<HTMLDivElement, AlertCardProps>
