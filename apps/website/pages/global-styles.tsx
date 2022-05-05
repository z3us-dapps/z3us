//import tw, { theme, globalStyles } from 'twin.macro'
//import { globalCss } from '../stitches.config'
//import { globalCss, darkTheme } from 'ui/src/theme'

import { globalCss } from 'ui/src/theme'
import tw, { theme, globalStyles as globalStylesTwinMacro } from 'twin.macro'

const customStyles = {
	body: {
		WebkitTapHighlightColor: theme`colors.purple.500`,
		...tw`antialiased`,
	},
}

const styles = () => {
	globalCss(customStyles)()
	globalCss(globalStylesTwinMacro as Record<any, any>)()
}

export default styles
