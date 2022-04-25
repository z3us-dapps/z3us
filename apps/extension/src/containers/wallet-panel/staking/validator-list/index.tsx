/* eslint-disable react/no-unstable-nested-components */
// @TODO: fix no-unstable-nested
import React, { useState } from 'react'
import { useValidators } from '@src/services/react-query/queries/radix'
import { Box } from 'ui/src/components/atoms'
import { Virtuoso } from 'react-virtuoso'
import { ScrollArea } from '@src/components/scroll-area'
import BigNumber from 'bignumber.js'
import { ValidatorItem } from '../validator-item'

const SCROLL_HEIGHT = 246

interface IProps {
	totalStakes?: BigNumber
}

export const ValidatorList: React.FC<IProps> = ({ totalStakes }: IProps) => {
	const [customScrollParent, setCustomScrollParent] = useState(null)
	const { data = [] } = useValidators()

	return (
		<Box>
			{data ? (
				<Box css={{ position: 'relative', height: `${SCROLL_HEIGHT}px` }}>
					<ScrollArea scrollableNodeProps={{ ref: setCustomScrollParent }}>
						<Virtuoso
							customScrollParent={customScrollParent}
							totalCount={data.length}
							itemContent={i => {
								const validator = data[i]
								return <ValidatorItem validator={validator} totalStakes={totalStakes} style={{ height: 44 }} />
							}}
						/>
					</ScrollArea>
				</Box>
			) : null}
		</Box>
	)
}

ValidatorList.defaultProps = { totalStakes: null }
