import React, { useRef, useEffect } from 'react'
import { Button } from 'components/button'
import { useGetStoreHref } from 'hooks/use-get-store-href'

const createSVG = (width: number, height: number, radius: number) => {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
	const rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
	svg.setAttributeNS('http://www.w3.org/2000/svg', 'viewBox', `0 0 ${width} ${height}`)

	rectangle.setAttribute('x', '0')
	rectangle.setAttribute('y', '0')
	rectangle.setAttribute('width', '100%')
	rectangle.setAttribute('height', '100%')
	rectangle.setAttribute('rx', `${radius}`)
	rectangle.setAttribute('ry', `${radius}`)
	rectangle.setAttribute('pathLength', '10')
	svg.appendChild(rectangle)
	return svg
}

export interface IProps {
	children: React.ReactNode
	showEffect?: boolean
	variant: 'primary' | 'secondary' | 'ghost'
	size: 'sm' | 'base' | 'lg' | 'xl' | '2xl'
}

const defaultProps = {
	showEffect: true,
}

export const FlashCtaButton = ({ children, size, variant, showEffect }: IProps): JSX.Element => {
	const buttonRef = useRef(null)
	const ctaLink = useGetStoreHref()

	useEffect(() => {
		const button = buttonRef.current
		if (button && showEffect) {
			const borderRadius = 25
			const buttonRect = button.getBoundingClientRect()
			const lines = document.createElement('div')
			lines.classList.add('lines')
			const groupTop = document.createElement('div')
			const groupBottom = document.createElement('div')

			const svg = createSVG(buttonRect.width, buttonRect.height, borderRadius)

			groupTop.appendChild(svg)
			groupTop.appendChild(svg.cloneNode(true))
			groupTop.appendChild(svg.cloneNode(true))
			groupTop.appendChild(svg.cloneNode(true))

			groupBottom.appendChild(svg.cloneNode(true))
			groupBottom.appendChild(svg.cloneNode(true))
			groupBottom.appendChild(svg.cloneNode(true))
			groupBottom.appendChild(svg.cloneNode(true))

			lines.appendChild(groupTop)
			lines.appendChild(groupBottom)
			button.appendChild(lines)
		}
	}, [])

	return (
		<div ref={buttonRef} className="landing-cta-btn">
			<Button size={size} variant={variant} href={ctaLink} className="font-bold">
				{children}
			</Button>
		</div>
	)
}

FlashCtaButton.defaultProps = defaultProps
