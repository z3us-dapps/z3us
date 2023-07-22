import { useEffect, useState } from 'react'

export const useScrambleText = (inputString: string, scramble: boolean, scrambleAnimationLength = 150): string => {
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

		// Replace each character with a random alphanumeric character
		const scrambled = inputString.replace(/./g, getRandomChar)
		setScrambledString(scrambled)

		if (scramble) {
			const animationDuration = scrambleAnimationLength // in milliseconds
			const totalChars = inputString.length
			const charsPerInterval = Math.ceil(animationDuration / totalChars)
			let currentCharIndex = 0

			const intervalId = setInterval(() => {
				setScrambledString(prevScrambled => {
					if (currentCharIndex >= totalChars) {
						clearInterval(intervalId)
						return prevScrambled // Return the last state (scrambled string)
					}

					const nextChar = getRandomChar()
					currentCharIndex += 1

					return prevScrambled.slice(0, currentCharIndex - 1) + nextChar + prevScrambled.slice(currentCharIndex)
				})
			}, charsPerInterval)
		}
	}, [inputString, scramble])

	return scramble ? scrambledString : inputString
}
