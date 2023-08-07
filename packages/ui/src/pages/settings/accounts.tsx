import React from 'react'
import { useNavigate } from 'react-router-dom'

const Accounts: React.FC = () => {
	const navigate = useNavigate()

	function OnClick() {
		navigate(-1)
	}

	return (
		<div>
			<h1>Accounts</h1>
			<button type="button" style={{ display: 'block' }} onClick={OnClick}>
				Back
			</button>
		</div>
	)
}

export default Accounts
