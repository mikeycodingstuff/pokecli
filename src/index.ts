#! /usr/bin/env node

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
	try {
		const pokemons = await api.getAllPokemon();

		console.log('All Pokemon:');
		const displayNames = [];

		for (const pokemon of pokemons) {
			displayNames.push(`${pokemon.id}. ${pokemon.name}`);
		}

		const terminalWidth = process.stdout.columns || 80; // Default to 80 if terminal width is not available
		const minColumnWidth = 20; // Minimum column width

		const columns = Math.floor(terminalWidth / minColumnWidth);

		const columnWidth = Math.floor(terminalWidth / columns);

		for (let i = 0; i < displayNames.length; i += columns) {
			const row = displayNames.slice(i, i + columns);
			const formattedRow = row.map(name => name.padEnd(columnWidth)).join('');
			console.log(formattedRow);
		}
	} catch (error: any) {
		console.error('Error fetching Pokemon: ', error.message);
	}
}

if (options.all) {
	displayPokemon();
}

if (!process.argv.slice(2).length) {
	program.outputHelp();
}