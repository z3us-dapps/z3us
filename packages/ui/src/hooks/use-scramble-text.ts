import { useEffect, useState } from 'react'

export const useScrambleText = (inputString: string, scramble: boolean, scrambleAnimationLength = 50): string => {
	const [scrambledString, setScrambledString] = useState<string>('')

	useEffect(() => {
		if (!scramble) {
			setScrambledString(inputString)
			return
		}

		// Function to generate a random alphanumeric character
		const getRandomChar = (): string => {
			const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
			const randomIndex = Math.floor(Math.random() * characters.length)
			return characters[randomIndex]
		}

		// Function to scramble characters from left to right
		const animateScramble = (currentCharIndex: number) => {
			if (currentCharIndex >= inputString.length) {
				return // Animation completed, no need to update the state
			}

			setScrambledString(prevScrambled => {
				const nextChar = getRandomChar()
				return prevScrambled.slice(0, currentCharIndex) + nextChar + prevScrambled.slice(currentCharIndex + 1)
			})

			setTimeout(() => {
				animateScramble(currentCharIndex + 1)
			}, scrambleAnimationLength) // Adjust the interval value to control the animation speed
		}

		// Start the animation
		animateScramble(0)
	}, [inputString, scramble])

	return scramble ? scrambledString : inputString
}
