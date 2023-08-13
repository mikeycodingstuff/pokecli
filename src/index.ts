#!/usr/bin/env node

import { Command } from 'commander';
import header from './helpers/header.js';
import * as api from './api/api.js';

const program = new Command();

const description = `A command line tool that shows pokemon info by consuming the pokemon API (found at ${api.API_BASE_URL})`
const options = program.opts();

program
	.name('pokemon')
	.version('1.0.0', '-v, -V, --vers, --version', 'output the current version')
	.description(description)
	.option('-a, --all', 'List all pokemon')
	.addHelpText('before', header);

program.parse(process.argv);

const displayPokemon = async () => {
	const displayNames = await formatAllPokemonData();

	const terminalWidth = process.stdout.columns || 80;
	const minColumnWidth = 20;

	const columns = Math.floor(terminalWidth / minColumnWidth);

	const columnWidth = Math.floor(terminalWidth / columns);

	console.log('All Pokemon:');

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

if (options.all) {
	displayPokemon();
}

if (!process.argv.slice(2).length) {
	program.outputHelp();
}