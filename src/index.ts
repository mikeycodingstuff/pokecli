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
		const pokemonData = await api.getAllPokemon();

		console.log('All Pokemon:');

		for (const pokemon of pokemonData.results) {
			console.log(pokemon.name);
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