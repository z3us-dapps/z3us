/* eslint-disable react/jsx-props-no-spreading */
import { Cross2Icon } from '@radix-ui/react-icons'
import type { PropsWithoutRef, RefAttributes} from 'react';
import React, { useImperativeHandle, useRef } from 'react'

import type { PropsWithCSS } from '../../types'
import { __DEV__ } from '../../utils/assertion'
import withDefaults from '../../utils/with-defaults'
import Button from '../button'
import type { PillVariantsProps} from './pill.styles';
import { StyledPill } from './pill.styles'

export interface Props {
	as?: keyof JSX.IntrinsicElements
	onClose?: () => void
}

const defaultProps = {
	as: 'div' as keyof JSX.IntrinsicElements,
	onClose: undefined,
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>

export type PillProps = React.PropsWithChildren<PropsWithCSS<Props & NativeAttrs & PillVariantsProps>>

const Pill = React.forwardRef<HTMLDivElement, PillProps>(
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

type PillComponent<T, P = {}> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>

if (__DEV__) {
	Pill.displayName = 'z3usUI - Pill'
}

Pill.toString = () => '.z3us pill'

export default withDefaults(Pill, defaultProps) as PillComponent<HTMLDivElement, PillProps>
