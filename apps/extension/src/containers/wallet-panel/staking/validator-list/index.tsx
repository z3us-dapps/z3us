import React, { useState } from 'react'
import { useValidators } from '@src/services/react-query/queries/radix'
import { Flex, Box } from 'ui/src/components/atoms'
import { Virtuoso } from 'react-virtuoso'
import { ScrollArea } from '@src/components/scroll-area'
import BigNumber from 'bignumber.js'
import LoaderBars from 'ui/src/components/loader-bars'
import { ValidatorItem } from '../validator-item'

const SCROLL_HEIGHT = 246

interface IProps {
	totalStakes?: BigNumber
}

export const ValidatorList: React.FC<IProps> = ({ totalStakes }) => {
	const [customScrollParent, setCustomScrollParent] = useState(null)
	const { data = [] } = useValidators()
	const hasValidations = data.length > 0

	return hasValidations ? (
		<Box css={{ position: 'relative', height: `${SCROLL_HEIGHT}px` }}>
			<ScrollArea scrollableNodeProps={{ ref: setCustomScrollParent }}>
				<Virtuoso
					customScrollParent={customScrollParent}
					totalCount={data.length}
					// eslint-disable-next-line react/no-unstable-nested-components
					itemContent={i => {
						const validator = data[i]
						return <ValidatorItem i={i} validator={validator} totalStakes={totalStakes} />
					}}
				/>
			</ScrollArea>
		</Box>
	) : (
		<Flex align="center" justify="center" css={{ height: `${SCROLL_HEIGHT}px` }}>
			<LoaderBars />
		</Flex>
	)
}

ValidatorList.defaultProps = { totalStakes: null }
