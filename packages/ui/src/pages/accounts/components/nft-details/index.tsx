import React from 'react'
import { useParams } from 'react-router-dom'

import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import BaseNftDetails from 'ui/src/components/resource/nft'
import { useNonFungibleData } from 'ui/src/hooks/dapp/use-entity-nft'

const NftDetails: React.FC = () => {
	const { resourceId, nftId: rawNftId } = useParams()
	const nftId = rawNftId ? decodeURIComponent(rawNftId) : undefined

	const { data, isLoading } = useNonFungibleData(resourceId, nftId)

	if (!resourceId) return null
	if (!nftId) return null

	if (isLoading) return <FallbackLoading />

	if (!data) return null

	return <BaseNftDetails nft={data} withCardButtons />
}

export default NftDetails
