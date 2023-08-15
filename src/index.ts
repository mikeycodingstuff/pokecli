#!/usr/bin/env node

import { Command } from 'commander';
import { header, mainHeader } from './helpers/display/headers.js';
import { cliName, mainColor, pokemonTextCaps } from './config/config.js';
import { API_BASE_URL, getRandomPokemon } from './api/api.js';
import { formatPokemonListData } from './helpers/formatting/formatPokemonData.js';
import { formatPokemonData } from './helpers/formatting/formatApiData.js';
import { displayPokemon, displayPokemonList } from './helpers/display/displayPokemon.js';
import chalk from 'chalk';

const program = new Command();

const description = `A command line tool that shows pokemon info by consuming the pokemon API (found at ${chalk.hex(mainColor)(API_BASE_URL)})`;
const options = program.opts();

const main = async () => {
	program
		.name('pokemon')
		.version(`${cliName} 1.0.0`, '-v, -V, --vers, --version', 'output the current version')
		.argument('[id/name]', 'find a pokemon by its national pokedex id or name')
		.action((idName) => handlePokemonIdOrName(idName))
		.description(description)
		.option('-a, --all', 'List all pokemon')
		.option('-r, --random', 'List stats for a random pokemon')
		.addHelpText('before', mainHeader);

	program.parse(process.argv);

	if (options.all) {
		handleAll();
	}

	if (options.random) {
		handleRandom();
	}

	if (!process.argv.slice(2).length) {
		program.outputHelp();
	}
};

const handleAll = async () => {
	const pokemons = await formatPokemonListData();
	header(`All ${pokemonTextCaps}:`);
	displayPokemonList(pokemons);
};

const handleRandom = async () => {
	const data = await getRandomPokemon();
	const pokemon = formatPokemonData(data);
	header(`Random ${pokemonTextCaps}:`);
	displayPokemon(pokemon);
};

const handlePokemonIdOrName = async (idName: number | string) => {
	console.log(`this function will handle pokemon id or name. id/name = ${idName}`);
};

main();
