import React from 'react'

import { Box } from 'ui/src/components/box'
import { Link } from 'ui/src/components/router-link'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

import { AccountsList } from './components/accounts-list'
import * as styles from './styles.css'

const Home: React.FC = () => (
	<Box>
		<Box className={styles.titleWrapper}>
			<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
				All
			</Text>
		</Box>
		<Box className={styles.assetTileWrapper}>
			<Link to="/accounts?tx=7878" className={styles.assetTile}>
				<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
					TX demo
				</Text>
			</Link>
			<Link to="/accounts/-/tokens" className={styles.assetTile}>
				<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
					<Translation text="accounts.home.button.all_tokens" />
				</Text>
			</Link>
			<Link to="/accounts/-/nfts" className={styles.assetTile}>
				<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
					<Translation text="accounts.home.button.all_nfts" />
				</Text>
			</Link>
		</Box>
		<Box className={styles.titleWrapper}>
			<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
				<Translation text="accounts.home.button.all" />
			</Text>
		</Box>
		<AccountsList />
	</Box>
)

export default Home
