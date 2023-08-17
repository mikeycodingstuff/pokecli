// test/display/chalkErrorMessage.test.ts
import chalkErrorMessage from '../../src/helpers/display/chalkErrorMessage';

// Mock chalk module
jest.mock('chalk', () => ({
	bgRed: (text: string): string => `background red: ${text}`,
}));

describe('chalkErrorMessage', () => {
	it('should apply background red using chalk.bgRed', () => {
		const message = 'Error message';
		const result = chalkErrorMessage(message);
		expect(result).toBe('background red: Error message');
	});
});

// Mock chalk module
jest.mock('chalk', () => ({
	bgRed: (text: string): string => `background red: ${text}`,
}));

describe('chalkErrorMessage', () => {
	it('should apply background red using chalk.bgRed', () => {
		const message = 'Error message';
		const result = chalkErrorMessage(message);
		expect(result).toBe('background red: Error message');
	});
});
