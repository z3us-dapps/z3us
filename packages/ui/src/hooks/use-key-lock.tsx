import { useEffect, useState } from 'react'

type KeyLock = 'CapsLock' | 'NumLock' | 'ScrollLock'

const useKeyLock = (key: KeyLock) => {
	const [toggled, setToggled] = useState<boolean>(false)

	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			setToggled(on => event.getModifierState?.(key) ?? on)
		}

		document.addEventListener('keydown', onKey)
		document.addEventListener('keyup', onKey)
		return () => {
			document.removeEventListener('keydown', onKey)
			document.removeEventListener('keyup', onKey)
		}
	}, [key])

	return toggled
}
export default useKeyLock
