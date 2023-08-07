import React from 'react'
import { Link } from 'react-router-dom'

const Fungibles: React.FC = () => (
	<div>
		<h1>Fungibles</h1>
		<ul>
			<li>
				<Link to="/accounts/-/fungibles/1">1</Link>
			</li>
			<li>
				<Link to="/accounts/-/fungibles/2">2</Link>
			</li>
			<li>
				<Link to="/accounts/-/fungibles/3">3</Link>
			</li>
		</ul>
	</div>
)

export default Fungibles
