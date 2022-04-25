import React from 'react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { render, screen } from '@testing-library/react'
import Button from '../index'

expect.extend(toHaveNoViolations)

const BUTTON_TEXT = 'Button Text'

describe('given a button', () => {
	it('should have no accessibility violations', async () => {
		const { container } = render(<Button>{BUTTON_TEXT}</Button>)
		const result = await axe(container)
		expect(result).toHaveNoViolations()
	})
})

describe('given a button with text', () => {
	it('should render expected text', () => {
		render(<Button>{BUTTON_TEXT}</Button>)
		const result = screen.getByText(BUTTON_TEXT)
		expect(result).toBeInTheDocument()
	})
})
