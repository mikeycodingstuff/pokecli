import chalk from 'chalk';

const displayError = (message: string) => {
	console.error(chalk.bgRed(message));
};

export default displayError;
