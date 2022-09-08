import { useTheme } from 'next-themes'
import { ChevronUpIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/24/solid'
import * as SelectPrimitive from '@radix-ui/react-select'
import cx from 'classnames'
import { Button } from 'components/button'

interface IProps {
	className?: string
}

export const ThemeSelector = ({ className }: IProps) => {
	const { theme, setTheme } = useTheme()

	return (
		<div className={`theme-selector ${className}`}>
			<SelectPrimitive.Root
				defaultValue={theme || 'light'}
				onValueChange={_theme => {
					setTheme(_theme)
				}}
			>
				<SelectPrimitive.Trigger asChild aria-label="Food">
					<Button size="sm" variant="ghost" className="capitalize">
						<SelectPrimitive.Value />
						<SelectPrimitive.Icon className="ml-1">
							<ChevronDownIcon className="h-3 w-3" />
						</SelectPrimitive.Icon>
					</Button>
				</SelectPrimitive.Trigger>
				<SelectPrimitive.Content>
					<SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
						<ChevronUpIcon className="h-6 w-6" />
					</SelectPrimitive.ScrollUpButton>
					<SelectPrimitive.Viewport className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
						<SelectPrimitive.Group>
							{['light', 'dark', 'system'].map((f, i) => (
								<SelectPrimitive.Item
									key={`${f}-${i}`}
									value={f.toLowerCase()}
									className={cx(
										'relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900',
										'radix-disabled:opacity-50',
										'focus:outline-none select-none',
									)}
								>
									<SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
									<SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
										<CheckIcon className="h-6 w-6" />
									</SelectPrimitive.ItemIndicator>
								</SelectPrimitive.Item>
							))}
						</SelectPrimitive.Group>
					</SelectPrimitive.Viewport>
					<SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
						<ChevronDownIcon className="h-6 w-6" />
					</SelectPrimitive.ScrollDownButton>
				</SelectPrimitive.Content>
			</SelectPrimitive.Root>
		</div>
	)
}
