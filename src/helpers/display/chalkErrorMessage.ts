import chalk from 'chalk';

const chalkErrorMessage = (message: string): string => chalk.bgRed(message);

export default chalkErrorMessage;
