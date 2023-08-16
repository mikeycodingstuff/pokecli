#!/usr/bin/env node

import { Command } from 'commander';
import { mainHeader } from './helpers/display/headers.js';
import { cliName, mainColor } from './config/config.js';
import { API_BASE_URL } from './api/api.js';
import chalk from 'chalk';
import {
	handlePokemonIdOrName,
	handleOptions,
} from './cliFunctions/handleInputs.js';

const program = new Command();
const options = program.opts();

const description =
	'A command line tool that shows pokemon info by consuming the pokemon API ' +
	`(found at ${chalk.hex(mainColor)(API_BASE_URL)})`;

const main = (): void => {
	program
		.name('pokemon')
		.version(`${cliName} 1.0.0`, '-v, --version', 'output the current version')
		.description(description)
		.addHelpText('before', mainHeader)
		.option('-a, --all', 'list all pokemon')
		.option('-r, --random', 'list stats for a random pokemon');

	program
		.argument('[id/name]', 'find a pokemon by its national pokedex id or name')
		.action((idOrName) => handlePokemonIdOrName(idOrName));

	program.parse(process.argv);

	if (!process.argv.slice(2).length) {
		program.outputHelp();
	}

	handleOptions(options);
};

main();
