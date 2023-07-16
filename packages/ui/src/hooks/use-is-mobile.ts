import screensJson from 'design/tokens/foundation/screens.json'
import { useMediaQuery } from 'usehooks-ts'

const TABLET_BREAK_POINT = parseInt(screensJson.screens.md.value.replace('px', ''), 10)

export const useIsMobileWidth = () => useMediaQuery(`(max-width: ${TABLET_BREAK_POINT}px)`)
