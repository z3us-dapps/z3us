import { globalCss } from 'ui/src/theme'

const docsGlobalStyles = globalCss({
	body: {
		height: '100%',
		minHeight: '100%',
		position: 'relative',
		'&:before': {
			content: '',
			position: 'absolute',
			pe: 'none',
			top: '0',
			left: '0',
			right: '0',
			bottom: '0',
			backgroundImage: 'url(/images/greek-repeat.jpeg)',
			backgroundRepeat: 'repeat',
			opacity: '0.03',
			minHeight: '100%',
		},
		'> div': {
			position: 'relative',
		},
	},
})

export default docsGlobalStyles
