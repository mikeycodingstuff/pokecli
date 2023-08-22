import chalkErrorMessage from '../../src/helpers/display/chalkErrorMessage';

jest.mock('chalk', () => ({
	bgRed: (text: string): string => `background red: ${text}`,
}));

describe('chalkErrorMessage', () => {
	it('should return a message with background red styling', () => {
		const message = 'Error message';
		const result = chalkErrorMessage(message);
		expect(result).toBe('background red: Error message');
	});
});
