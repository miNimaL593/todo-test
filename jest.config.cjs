module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy', // для поддержки CSS модулей
	},
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
