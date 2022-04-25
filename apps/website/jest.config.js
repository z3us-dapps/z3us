const base = require('../../jest.config')

module.exports = {
  ...base,
	collectCoverageFrom: ['<rootDir>/**/*.{js,ts,tsx}'],
  name: 'website',
  displayName: 'website tests',
}
