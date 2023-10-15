/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTimeout } from 'usehooks-ts'

import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'
import { getRandomNumberInRange } from 'ui/src/utils/get-random-number-in-ranger'

import { StakingStatisticCell } from '../components/staking-statistic-cell'
import * as styles from './styles.css'

const messages = defineMessages({
	validator: {
		id: 'Ykb512',
		defaultMessage: 'Validator',
	},
	address: {
		id: 'e6Ph5+',
		defaultMessage: 'Address',
	},
	total_stake: {
		id: '7vSKTY',
		defaultMessage: 'Total stake',
	},
	owner_stake: {
		id: '3tVTRk',
		defaultMessage: 'Owner stake',
	},
	uptime: {
		id: 'u81G9+',
		defaultMessage: 'Uptime',
	},
	apy: {
		id: 'MLTKb6',
		defaultMessage: 'APY',
	},
	fee: {
		id: '7Zeppl',
		defaultMessage: 'Fee %',
	},
})

const generateRandomString = () => Math.random().toString(36).substring(7)

const loadingItems = Array.from({ length: 400 }).map((_, i, a) => {
	const randomStr = generateRandomString()
	return {
		id: `${i}-${randomStr}`,
		validator: `${i}-${randomStr}`,
		address: `${i}-${randomStr}`,
		totalStake: getRandomNumberInRange(1, 100),
		ownerStake: getRandomNumberInRange(1, 100),
		apy: getRandomNumberInRange(1, 100),
		fee: getRandomNumberInRange(1, 100),
		upTime: getRandomNumberInRange(1, 100),
		acceptsStake: getRandomNumberInRange(1, 100),
	}
})

type TAssetsTable = {
	items: any
	columns: any
	loading: boolean
	loadMore: boolean
	onRowSelected: (row: any) => void
	onEndReached: () => void
}

export const useStakingTable = (): TAssetsTable => {
	const intl = useIntl()
	const navigate = useNavigate()
	const location = useLocation()

	const columnsAssets = useMemo(
		() => [
			{
				Header: intl.formatMessage(messages.validator),
				accessor: 'validator',
				width: '20%',
				// width: 'auto',
				Cell: StakingStatisticCell,
				// className: styles.mobileHideTableCellWrapper,
			},
			{
				Header: intl.formatMessage(messages.address),
				accessor: 'address',
				width: 'auto',
				Cell: StakingStatisticCell,
			},
			{
				Header: intl.formatMessage(messages.total_stake),
				accessor: 'totalStake',
				width: 'auto',
				Cell: StakingStatisticCell,
				// className: styles.mobileHideTableCellWrapper,
			},
			{
				Header: intl.formatMessage(messages.owner_stake),
				accessor: 'ownerStake',
				width: 'auto',
				Cell: StakingStatisticCell,
			},
			{
				Header: intl.formatMessage(messages.uptime),
				accessor: 'upTime',
				width: '13%',
				Cell: StakingStatisticCell,
			},
			{
				Header: intl.formatMessage(messages.apy),
				accessor: 'apy',
				width: '8%',
				Cell: StakingStatisticCell,
			},
			{
				Header: intl.formatMessage(messages.fee),
				accessor: 'fee',
				width: '8%',
				Cell: StakingStatisticCell,
			},
			// {
			// 	Header: 'Accepts',
			// 	accessor: 'acceptsStake',
			// 	width: '10%',
			// 	Cell: StakingStatisticCell,
			// },
		],
		[],
	)

	const [items, setItems] = useState<any>(loadingItems)
	const [loading, setLoading] = useState<boolean>(false)
	const [loadMore, setLoadMore] = useState<boolean>(false)
	const [columns, setColumns] = useState<any>(columnsAssets)

	const handleRowSelected = (row: any) => {
		const { id } = row
		navigate(`/staking?validator=${id}`)
	}

	return {
		items,
		columns,
		loading,
		loadMore,
		onRowSelected: handleRowSelected,
		onEndReached: () => {},
	}
}
