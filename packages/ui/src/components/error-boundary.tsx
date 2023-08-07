import { useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {
	const error = useRouteError() as Error

	const handleButtonClick = () => {
		window.location.reload()
	}

	return (
		<div>
			<h1>Uh oh, something went terribly wrong 😩</h1>
			<pre>{error.message || JSON.stringify(error)}</pre>
			<button type="button" onClick={handleButtonClick}>
				Click here to reload the app
			</button>
		</div>
	)
}

export default ErrorBoundary
