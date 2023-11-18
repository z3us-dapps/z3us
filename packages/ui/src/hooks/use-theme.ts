import { useContext } from 'react'

import { ThemeContext } from 'ui/src/context/theme'

export const useTheme = () => useContext(ThemeContext)
