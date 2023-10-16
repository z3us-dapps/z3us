import { useState } from 'react'

import './styles.css'

const Demo = () => {
	const [count, setCount] = useState<number>(0)

	const handleClink = () => setCount(c => c + 1)

	return (
		<div>
			<h1>WIDGET</h1>
			<button type="button" onClick={handleClink}>
				count is {count}
			</button>
		</div>
	)
}

export default Demo
