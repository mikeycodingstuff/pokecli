import chalk from 'chalk';

const mainColor = '#7b62ac';

const mainHeader = `
  ${chalk.bgHex(mainColor)('pokemon cli'.toUpperCase())}
  by ${chalk.hex(mainColor)('Mikey')}
`;

const header = (text: string) => console.log(`
  ${chalk.bgHex(mainColor)(text)}
`);


export { mainHeader, header};
