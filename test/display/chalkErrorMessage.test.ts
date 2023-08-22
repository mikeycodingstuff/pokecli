import chalkErrorMessage from '../../src/helpers/display/chalkErrorMessage';

jest.mock('chalk', () => ({
	bgRed: (text: string): string => `background red: ${text}`,
}));

describe('chalkErrorMessage', () => {
	it('should return a message with background red styling', () => {
		const message = 'Error message';
		const result = chalkErrorMessage(message);

		expect(result).toBe('background red: ' + message);
	});

	it('should return an empty string for an empty message', () => {
		const result = chalkErrorMessage('');

		expect(result).toBe('background red: ');
	});

	it('should properly style a message with special characters', () => {
		const message = 'Error: [Critical]';
		const result = chalkErrorMessage(message);

		expect(result).toBe('background red: ' + message);
	});

	it('should style each line of a multi-line message', () => {
		const message = 'Line 1\nLine 2\nLine 3';
		const result = chalkErrorMessage(message);

		expect(result).toBe('background red: ' + message);
	});

	it('should style a message with Unicode characters', () => {
		const message = '🔴 Error 🔴';
		const result = chalkErrorMessage(message);

		expect(result).toBe('background red: ' + message);
	});
});
