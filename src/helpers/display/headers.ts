import chalk from 'chalk';

import {
	authorFormatted,
	cliNameHeader,
	mainColor,
} from '../../config/config.js';

const mainHeader = `
  ${chalk.whiteBright.bgHex(mainColor)(cliNameHeader)}
  by ${chalk.hex(mainColor)(authorFormatted)}
`;

const header = (text: string): void =>
	console.log(`
  ${chalk.whiteBright.bgHex(mainColor)(text)}
`);

export { header, mainHeader };
