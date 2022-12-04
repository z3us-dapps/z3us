/* eslint-disable */
import useSWR from 'swr'

type Props = {}

const fetcher = (url: string) => fetch(url).then(res => res.json())

type Result = {
	title: string
	body: string
}

export const Card: React.VFC<Props> = () => {
	const { data, error } = useSWR<Result>('/api/hello', fetcher)

	if (error) {
		return (
			<div className="flex flex-col justify-center items-center w-80 p-3 border border-gray-400 rounded-lg animate-pulse">
				<p className="text-black text-xl" role="card-error-text">
					Error we have
				</p>
			</div>
		)
	}

	// empty
	if (!data) {
		return (
			<div className="flex flex-col justify-center items-center w-80 p-3 border border-gray-400 rounded-lg animate-pulse">
				<div className="h-6 w-56 bg-gray-300" />

				<div className="w-full pt-2">
					<div className="h-5 w-full bg-gray-300" />
					<div className="h-5 w-full bg-gray-300 mt-1" />
					<div className="h-5 w-full bg-gray-300 mt-1" />
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col justify-center items-center w-80 p-3 border border-gray-400 rounded-lg">
			<h2 className="text-black text-2xl font-bold" role="card-title">
				{data.title}
			</h2>

			<div className="w-full pt-2">
				<p className="text-black text-xl" role="card-body">
					{data.body}
				</p>
			</div>
		</div>
	)
}
