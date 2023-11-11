/* eslint-disable */
'use client'

import { clsx } from 'clsx'
import { useMDXComponent } from 'next-contentlayer/hooks'
import * as React from 'react'

import * as styles from './styles.css'

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

const components = {
	h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1 className={clsx(styles.marginWrapper, styles.headingWrapper, className)} {...props} />
	),
	h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2 className={clsx(styles.marginWrapper, styles.headingWrapper, className)} {...props} />
	),
	h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3 className={clsx(styles.marginWrapper, styles.headingWrapper, className)} {...props} />
	),
	h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h4 className={clsx(styles.marginWrapper, styles.headingWrapper, className)} {...props} />
	),
	h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h5 className={clsx(styles.marginWrapper, styles.headingWrapper, className)} {...props} />
	),
	h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h6 className={clsx(styles.marginWrapper, styles.headingWrapper, className)} {...props} />
	),
	a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
		<a className={clsx(styles.marginWrapper, className)} {...props} />
	),
	p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p className={clsx(styles.marginWrapper, className)} {...props} />
	),
	ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
		<ul className={clsx(styles.marginWrapper, styles.olUlWrapper, className)} {...props} />
	),
	ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
		<ol className={clsx(styles.marginWrapper, styles.olUlWrapper, className)} {...props} />
	),
	li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<li className={clsx(styles.marginWrapper, className)} {...props} />
	),
	blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<blockquote className={clsx(styles.marginWrapper, className)} {...props} />
	),
	img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img className={clsx(styles.marginWrapper, className)} alt={alt} {...props} />
	),
	hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => <hr className="my-4 md:my-8" {...props} />,
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="my-6 w-full overflow-y-auto">
			<table className={clsx('w-full', className)} {...props} />
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr className={clsx('m-0 border-t p-0 even:bg-muted', className)} {...props} />
	),
	th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
		<th
			className={clsx(
				'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
				className,
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
		<td
			className={clsx(
				'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
				className,
			)}
			{...props}
		/>
	),
	pre: ({
		className,
		__rawString__,
		__withMeta__,
		__src__,
		...props
	}: React.HTMLAttributes<HTMLPreElement> & {
		__rawString__?: string
		__withMeta__?: boolean
		__src__?: string
	}) => {
		return (
			<>
				<pre
					className={clsx(
						'mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 data-[theme=dark]:bg-background data-[theme=light]:bg-white',
						className,
					)}
					{...props}
				/>
			</>
		)
	},
	code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<code
			className={clsx('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm', className)}
			{...props}
		/>
	),
}

interface MdxProps {
	code: string
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code)

	return (
		<div className="mdx">
			<Component components={components} />
		</div>
	)
}
