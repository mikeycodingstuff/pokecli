#!/usr/bin/env node

import { Command } from 'commander';
import { mainHeader } from './helpers/headers.js';
import { cliName, mainColor } from '../config/config.js';
import * as api from './api/api.js';
import chalk from 'chalk';
import { formatPokemonListData, formatRandomPokemonData } from './helpers/formatPokemonData.js';
import { displayPokemonList } from './helpers/displayPokemon.js';

const program = new Command();

const description = `A command line tool that shows pokemon info by consuming the pokemon API (found at ${chalk.hex(mainColor)(api.API_BASE_URL)})`;
const options = program.opts();

const main = async () => {
	program
		.name('pokemon')
		.version(`${cliName} 1.0.0`, '-v, -V, --vers, --version', 'output the current version')
		.description(description)
		.option('-a, --all', 'List all pokemon')
		.option('-r, --random', 'List stats for a random pokemon')
		.addHelpText('before', mainHeader);

	program.parse(process.argv);

	if (options.all) {
		const pokemons = await formatPokemonListData();
		displayPokemonList(pokemons);
	}

	if (options.random) {
		const pokemon = await formatRandomPokemonData();
		console.log(pokemon);
	}

	if (!process.argv.slice(2).length) {
		program.outputHelp();
	}
};

main();
