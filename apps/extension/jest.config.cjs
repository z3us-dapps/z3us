module.exports = {
	globals: {
		'ts-jest': {
			isolatedModules: true,
			diagnostics: false,
		},
	},
	verbose: true,
	rootDir: 'tests',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.js$': 'ts-jest',
	},
	testTimeout: 60000,
}
