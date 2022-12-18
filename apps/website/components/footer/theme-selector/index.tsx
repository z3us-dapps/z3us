import React, { useState, useEffect } from 'react'
import { darkTheme } from 'ui/src/theme'
import { useTheme } from 'next-themes'
import { ChevronUpIcon, ChevronDownIcon, CheckIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import * as SelectPrimitive from '@radix-ui/react-select'
import cx from 'classnames'
import { Button } from 'components/button'

interface IProps {
  className?: string | undefined
}

const defaultProps = {
  className: undefined,
}

export const ThemeSelector = ({ className }: IProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false)

  useEffect(() => {
    setIsLightTheme(resolvedTheme === 'light')
    const root = document.documentElement
    if (resolvedTheme === 'dark') {
      root.classList.add(darkTheme)
    } else {
      root.classList.remove(darkTheme)
    }
  }, [resolvedTheme])

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
            <span className="opacity-0 w-0">
              <SelectPrimitive.Value />
            </span>
            Theme
            <SelectPrimitive.Icon className="ml-1">
              {isLightTheme ? <SunIcon className="h-3 w-3" /> : <MoonIcon className="h-3 w-3" />}
            </SelectPrimitive.Icon>
          </Button>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Content>
          <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-wax-700 dark:text-wax-300">
            <ChevronUpIcon className="h-6 w-6" />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="bg-white dark:bg-zinc-800 p-2 rounded-lg shadow-lg">
            <SelectPrimitive.Group>
              {['light', 'dark', 'system'].map((f, i) => (
                <SelectPrimitive.Item
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${f}-${i}`}
                  value={f.toLowerCase()}
                  className={cx(
                    'relative flex items-center px-8 py-2 rounded-md text-xs font-medium text-wax-700 dark:text-wax-300 focus:bg-wax-0 dark:focus:bg-wax-0',
                    'focus:outline-none select-none',
                  )}
                >
                  <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <CheckIcon className="h-4 w-4" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-wax-700 dark:text-wax-300">
            <ChevronDownIcon className="h-6 w-6" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>
    </div>
  )
}

ThemeSelector.defaultProps = defaultProps
