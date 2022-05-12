import React, { useRef, useEffect } from 'react'
import { Box } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { config } from 'config'

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

export const FlashCtaButton = (): JSX.Element => {
	const buttonRef = useRef(null)

	useEffect(() => {
		const button = document.getElementsByClassName('landing-cta-btn')?.[0]
		if (button) {
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
		<Box ref={buttonRef} className="landing-cta-btn">
			<Button
				target="_blank"
				href={config.TELEGRAM_URL}
				as="a"
				size="6"
				color="secondary"
				rounded
				css={{
					width: '180px',
					color: '$black',
					backgroundColor: '#dddddd',
					fontFamily: '$HaasGrotTextRound',
					fontSize: '18px',
					lineHeight: '24px',
				}}
			>
				<Box css={{ position: 'relative', zIndex: '2' }}>Install BETA</Box>
			</Button>
		</Box>
	)
}
