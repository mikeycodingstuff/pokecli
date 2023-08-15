/**
 * Converts the input to either a number or a string.
 * If the input can be parsed as a number, returns the number; otherwise, returns the input as a string.
 * 
 * @param {string} input - The input value to be converted.
 * @returns {number|string} The converted value.
 */
const convertToNumberOrString = (input: string): number | string => {
	const parsedInput = Number(input);

	if (!isNaN(parsedInput)) {
		return parsedInput;
	} else {
		return String(input);
	}
};

export default convertToNumberOrString;
