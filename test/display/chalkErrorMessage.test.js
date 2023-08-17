// test/display/chalkErrorMessage.test.ts
import chalkErrorMessage from '../../src/helpers/display/chalkErrorMessage';
// Mocking chalk for testing
jest.mock('chalk', () => ({
	bgRed: (text) => `mockedBgRed(${text})`,
}));
describe('chalkErrorMessage', () => {
	test('should return a chalk.bgRed formatted message', () => {
		const inputMessage = 'Error message';
		const expectedOutput = 'mockedBgRed(Error message)';
		const result = chalkErrorMessage(inputMessage);
		expect(result).toBe(expectedOutput);
	});
});
//# sourceMappingURL=chalkErrorMessage.test.js.map
