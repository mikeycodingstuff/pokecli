#!/usr/bin/env node

import { Command } from 'commander';
import { mainHeader, header } from './helpers/headers.js';
import * as api from './api/api.js';

const program = new Command();

const description = `A command line tool that shows pokemon info by consuming the pokemon API (found at ${api.API_BASE_URL})`
const options = program.opts();

const displayPokemon = async () => {
	const displayNames = await formatAllPokemonData();

	const terminalWidth = process.stdout.columns || 80;
	const minColumnWidth = 20;

	const columns = Math.floor(terminalWidth / minColumnWidth);

	const columnWidth = Math.floor(terminalWidth / columns);

	header('All Pokemon:');

	for (let i = 0; i < displayNames.length; i += columns) {
		const row = displayNames.slice(i, i + columns);
		const formattedRow = row.map(name => name.padEnd(columnWidth)).join('');
		console.log(formattedRow);
	}
}

const formatAllPokemonData = async () => {
	try {
		const pokemons = await api.getAllPokemon();
		const displayNames = [];

		for (const pokemon of pokemons) {
			displayNames.push(`${pokemon.id}. ${pokemon.name}`);
		}

		return displayNames;
	} catch (error: any) {
		console.error('Error fetching Pokemon: ', error.message);
		return [];
	}
}

program
	.name('pokemon')
	.version('1.0.0', '-v, -V, --vers, --version', 'output the current version')
	.description(description)
	.option('-a, --all', 'List all pokemon')
	.addHelpText('before', mainHeader);

program.parse(process.argv);

if (options.all) {
	displayPokemon();
}

if (!process.argv.slice(2).length) {
	program.outputHelp();
}