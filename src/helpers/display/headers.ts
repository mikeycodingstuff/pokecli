import chalk from 'chalk';

import {
	authorFormatted,
	cliNameHeader,
	mainColor,
} from '../../config/config.js';

const mainHeader = `
  ${chalk.bgHex(mainColor)(cliNameHeader)}
  by ${chalk.hex(mainColor)(authorFormatted)}
`;

const header = (text: string): void =>
	console.log(`
  ${chalk.bgHex(mainColor)(text)}
`);

export { header, mainHeader };
