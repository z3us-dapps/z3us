import * as AccordionPrimitive from '@radix-ui/react-accordion'
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from '../box'
import * as styles from './accordion.css'

export const AccordionRoot = AccordionPrimitive.Root

export const AccordionItem = ({ children, ...props }: AccordionPrimitive.AccordionItemProps) => (
	<AccordionPrimitive.Item {...props}>{children}</AccordionPrimitive.Item>
)

export const AccordionHeader = forwardRef<HTMLHeadingElement, AccordionPrimitive.AccordionHeaderProps>(
	({ children, className, ...props }, ref) => (
		<AccordionPrimitive.Header ref={ref} className={clsx(styles.accordionHeaderWrapper, className)} {...props}>
			{children}
		</AccordionPrimitive.Header>
	),
)

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionPrimitive.AccordionTriggerProps>(
	({ children, className, ...props }, ref) => (
		<AccordionPrimitive.Trigger ref={ref} className={clsx(styles.accordionTriggerWrapper, className)} {...props}>
			{children}
		</AccordionPrimitive.Trigger>
	),
)

export const AccordionContent = forwardRef<HTMLDivElement, AccordionPrimitive.AccordionContentProps>(
	({ children, className, ...props }, ref) => (
		<AccordionPrimitive.Content ref={ref} className={clsx(styles.accordionContentWrapper, className)} {...props}>
			<Box>{children}</Box>
		</AccordionPrimitive.Content>
	),
)
