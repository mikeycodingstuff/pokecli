import chalk from 'chalk';
import { mainColor, cliNameHeader, authorFormatted } from '../../config.js';

const mainHeader = `
  ${chalk.bgHex(mainColor)(cliNameHeader)}
  by ${chalk.hex(mainColor)(authorFormatted)}
`;

const header = (text: string) => console.log(`
  ${chalk.bgHex(mainColor)(text)}
`);


export { mainHeader, header};
