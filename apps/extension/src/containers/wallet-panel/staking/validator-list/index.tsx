import React, { useState, useEffect } from 'react'
import { useValidators } from '@src/hooks/react-query/queries/radix'
import { Validator } from '@src/types'
import { Flex, Box } from 'ui/src/components/atoms'
import { useImmer } from 'use-immer'
import { SearchBox } from '@src/components/search-box'
import { Virtuoso } from 'react-virtuoso'
import { ScrollArea } from 'ui/src/components/scroll-area'
import BigNumber from 'bignumber.js'
import LoaderBars from 'ui/src/components/loader-bars'
import { ValidatorItem } from '../validator-item'

const SCROLL_HEIGHT = 193

interface IProps {
	totalStakes?: BigNumber
}

interface ImmerProps {
	search: string
	filteredList: Array<Validator>
}

const generateFilteredList = (search: string, list: Array<Validator>) =>
	list.filter(
		(validatorItem: Validator) =>
			(search !== '' && validatorItem.name?.toLowerCase().includes(search)) ||
			validatorItem.infoURL?.toLowerCase().includes(search),
	)

export const ValidatorList: React.FC<IProps> = ({ totalStakes }) => {
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
	const [state, setState] = useImmer<ImmerProps>({
		search: '',
		filteredList: [],
	})
	const { data = [] } = useValidators()
	const hasValidations = data.length > 0

	const handleSearchValidatorList = (search: string) => {
		setState(draft => {
			draft.search = search
		})
	}

	useEffect(() => {
		if (data?.length === 0) return
		setState(draft => {
			draft.filteredList = generateFilteredList(state.search.toLowerCase(), data)
		})
	}, [data.length, state.search])

	return hasValidations ? (
		<Box>
			<Box css={{ p: '$2', borderBottom: '1px solid', borderColor: '$borderPanel' }}>
				<SearchBox
					focusOnMount
					showCancelOnlyWithValueButton
					onSearch={handleSearchValidatorList}
					placeholder="Search validators"
					debounce={400}
				/>
			</Box>
			<Box
				css={{
					position: 'relative',
					height: `${SCROLL_HEIGHT}px`,
					overflow: 'hidden',
					borderRadius: ' 0px 0px 5px 5px',
				}}
			>
				<ScrollArea scrollableNodeProps={{ ref: setCustomScrollParent }}>
					<Virtuoso
						customScrollParent={customScrollParent}
						totalCount={state.filteredList.length}
						// eslint-disable-next-line react/no-unstable-nested-components
						itemContent={i => {
							const validator = state.filteredList[i]
							return <ValidatorItem i={i} validator={validator} totalStakes={totalStakes} />
						}}
					/>
				</ScrollArea>
			</Box>
		</Box>
	) : (
		<Flex align="center" justify="center" css={{ height: `${SCROLL_HEIGHT}px` }}>
			<LoaderBars />
		</Flex>
	)
}

ValidatorList.defaultProps = { totalStakes: null }
