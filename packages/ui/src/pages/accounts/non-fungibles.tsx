import React from 'react'
import { Link } from 'react-router-dom'

const NonFungibles: React.FC = () => (
	<div>
		<h1>NonFungibles</h1>
		<ul>
			<li>
				<Link to="/accounts/-/non-fungibles/1">1</Link>
			</li>
			<li>
				<Link to="/accounts/-/non-fungibles/2">2</Link>
			</li>
			<li>
				<Link to="/accounts/-/non-fungibles/3">3</Link>
			</li>
		</ul>
	</div>
)

export default NonFungibles
