import chalk from 'chalk';

const mainColor = '#7b62ac';

const welcome = () => {
    console.log(`
        ${chalk.bgHex(mainColor)('POKEMON API CLI')}
        by ${chalk.hex(mainColor)('Mikey')}

        An app for finding pokemon via the command line.
    `);
};

export default welcome;
