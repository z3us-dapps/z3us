import { useLocation, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import NftDetails from 'ui/src/components/resource/nft'
import { Link } from 'ui/src/components/router-link'
import { useNonFungiblesData } from 'ui/src/hooks/dapp/use-entity-nft'

interface IProps {
	ids: string[]
	collection: string
	selected: string
	hovered: string
	setHovered: (_: string) => void
	setSelected: (_: string) => void
}

export const PageWrapper: React.FC<IProps> = ({ collection, ids, selected, hovered, setHovered, setSelected }) => {
	const location = useLocation()
	const [searchParams] = useSearchParams()
	const { data, isLoading } = useNonFungiblesData(collection, ids)

	const handleClick = (id: string) => {
		setSelected(id)
		setHovered(null)
	}

	const handleMouseOver = (id: string) => {
		searchParams.set('query', `${collection}`)
		setHovered(id)
	}

	const handleMouseLeave = () => {
		setHovered(null)
		searchParams.delete('query')
	}

	if (isLoading) return <FallbackLoading />
	if (!data) return null

	return (
		<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
			{data.map(nft => (
				<Box
					key={nft.non_fungible_id}
					onClick={() => handleClick(nft)}
					disabled={nft.non_fungible_id === selected || nft.non_fungible_id === hovered}
					border={1}
					borderStyle="solid"
					borderColor="backgroundPrimary"
					style={{ maxWidth: '300px' }}
					overflow="clip"
				>
					<Link
						to={`${location.pathname}?${searchParams}`}
						underline="never"
						onMouseOver={() => handleMouseOver(nft.non_fungible_id)}
						onMouseLeave={handleMouseLeave}
					>
						<NftDetails nft={nft} />
					</Link>
				</Box>
			))}
		</Box>
	)
}
