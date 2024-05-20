import { useIntl } from 'react-intl'

import { ToolTip } from 'ui/src/components/tool-tip'
import Text, { type TextProps } from 'ui/src/components/typography/text'

const WEEK_IN_MILLIS = 6.048e8
const DAY_IN_MILLIS = 8.64e7
const HOUR_IN_MILLIS = 3.6e6
const MIN_IN_MILLIS = 6e4
const SEC_IN_MILLIS = 1e3

const getUTCTime = date => date.getTime() - date.getTimezoneOffset() * 60000

// For testing only, remove the constructor argument in production.
const getCurrentUTCTime = () => getUTCTime(new Date())

const defaultFormatOptions = {
	style: 'long',
}

const timeFromNow = (date, intl, options = defaultFormatOptions) => {
	const millis = typeof date === 'string' ? getUTCTime(new Date(date)) : getUTCTime(date)
	const diff = millis - getCurrentUTCTime()
	if (Math.abs(diff) > WEEK_IN_MILLIS)
		return intl.formatRelativeTime(Math.trunc(diff / WEEK_IN_MILLIS), 'week', options)
	if (Math.abs(diff) > DAY_IN_MILLIS) return intl.formatRelativeTime(Math.trunc(diff / DAY_IN_MILLIS), 'day', options)
	if (Math.abs(diff) > HOUR_IN_MILLIS)
		return intl.formatRelativeTime(Math.trunc((diff % DAY_IN_MILLIS) / HOUR_IN_MILLIS), 'hour', options)
	if (Math.abs(diff) > MIN_IN_MILLIS)
		return intl.formatRelativeTime(Math.trunc((diff % HOUR_IN_MILLIS) / MIN_IN_MILLIS), 'minute', options)
	return intl.formatRelativeTime(Math.trunc((diff % MIN_IN_MILLIS) / SEC_IN_MILLIS), 'second', options)
}

interface IProps extends TextProps {
	date: Date
	children?: any
}

export const TimeFromNow: React.FC<IProps> = ({ date, ...rest }) => {
	const intl = useIntl()

	if (!date) return null

	return (
		<ToolTip message={date.toLocaleString()}>
			<Text {...rest}>{timeFromNow(date, intl)}</Text>
		</ToolTip>
	)
}
