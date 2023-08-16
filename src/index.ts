#!/usr/bin/env node

import { Command } from 'commander';
import { header, mainHeader } from './helpers/display/headers.js';
import { cliName, mainColor, pokemonTextCaps } from './config/config.js';
import {
	API_BASE_URL,
	getPokemonById,
	getPokemonByName,
	getRandomPokemon,
} from './api/api.js';
import { formatPokemonListData } from './helpers/formatting/formatPokemonData.js';
import { formatPokemonData } from './helpers/formatting/formatApiData.js';
import {
	displayPokemon,
	displayPokemonList,
} from './helpers/display/displayPokemon.js';
import convertToNumberOrString from './helpers/string/convertToNumberOrString.js';
import chalk from 'chalk';
import { ApiPokemon } from './types.js';

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

	if (options.all) {
		handleAll();
	}

	if (options.random) {
		handleRandom();
	}
};

const handleAll = async (): Promise<void> => {
	const pokemons = await formatPokemonListData();
	header(`All ${pokemonTextCaps}:`);
	displayPokemonList(pokemons);
};

const handleRandom = async (): Promise<void> => {
	const data = await getRandomPokemon();
	handleSinglePokemon(data, true);
};

const handlePokemonIdOrName = async (input: string): Promise<undefined> => {
	if (!input) {
		return;
	}

	const parsedInput = convertToNumberOrString(input);

	if (typeof parsedInput === 'string') {
		const name = parsedInput.toLowerCase();
		const data = await getPokemonByName(name);
		handleSinglePokemon(data);
	}

	if (typeof parsedInput === 'number') {
		const id = parsedInput;
		const data = await getPokemonById(id);
		handleSinglePokemon(data);
	}
};

const handleSinglePokemon = async (
	data: ApiPokemon,
	random: boolean = false,
): Promise<void> => {
	const pokemon = await formatPokemonData(data);
	const headerText = random
		? ` Random ${pokemonTextCaps}: `
		: ` ${pokemonTextCaps}: `;
	header(headerText);
	displayPokemon(pokemon);
};

main();
