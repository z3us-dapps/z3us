/* eslint-disable react/jsx-props-no-spreading */
import React, { useImperativeHandle, useRef } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { CSS } from '../../theme'
import { __DEV__ } from '../../utils/assertion'
import Button from '../button'
import { StyledPill, PillVariantsProps } from './pill.styles'

export interface Props {
	as?: keyof JSX.IntrinsicElements
	onClose?: () => void
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>

export type PillProps = Props & NativeAttrs & PillVariantsProps & { css?: CSS }

const Pill = React.forwardRef<HTMLDivElement, React.PropsWithChildren<PillProps>>(
	({ children, as, css, onClose, color, ...rest }, ref: React.Ref<HTMLDivElement | null>) => {
		const cardRef = useRef<HTMLDivElement>(null)
		useImperativeHandle(ref, () => cardRef.current)

		return (
			<StyledPill ref={cardRef} as={as} color={color} css={{ ...(css as any) }} {...rest}>
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
			</StyledPill>
		)
	},
)

if (__DEV__) {
	Pill.displayName = 'z3usUI - Pill'
}

Pill.toString = () => '.z3us pill'

Pill.defaultProps = {
	as: 'div',
	onClose: undefined,
	css: undefined,
}

export default Pill
