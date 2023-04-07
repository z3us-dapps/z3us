import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import React from 'react'

import Input from '../index'

expect.extend(toHaveNoViolations)

const PLACEHOLDER_TEXT = 'Hello Placeholder'

describe('given an input', () => {
	it('should have no accessibility violations', async () => {
		const { container } = render(<Input placeholder={PLACEHOLDER_TEXT} />)
		const result = await axe(container)
		expect(result).toHaveNoViolations()
	})
})

describe('given a input with a placeholder', () => {
	it('should render expected placeholder', () => {
		render(<Input placeholder={PLACEHOLDER_TEXT} />)
		const result = screen.getByPlaceholderText(PLACEHOLDER_TEXT)
		expect(result).toBeInTheDocument()
	})
})
