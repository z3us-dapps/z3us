const path = require('path')

const fromRoot = d => path.join(__dirname, d)

module.exports = {
	roots: [fromRoot('packages/ui/src')],
	resetMocks: true,
	coveragePathIgnorePatterns: [],
	collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts,tsx}'],
	coverageThreshold: null,
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': 'esbuild-jest',
	},
	setupFilesAfterEnv: ['@testing-library/jest-dom'],
	moduleDirectories: ['node_modules'],
	moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
}
