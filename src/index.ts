#! /usr/bin/env node
import { Command } from 'commander';
import header from './helpers/header.js';
import * as api from './api/api.js';

const program = new Command();

const description = 'A command line tool that shows pokemon info by consuming the pokemon API (found at https://pokeapi.co/v2)'
const options = program.opts();

program
	.name('pokemon')
	.version('1.0.0')
	.description(description)
	.option('-a, --all', 'List all pokemon')
	.addHelpText('before', header);

program.parse(process.argv);

if (options.all) {
	api.getAllPokemon()
		.then(data => {
			console.log('All Pokemon: ', data);
		})
		.catch(error => {
			console.error('Error fetching Pokemon: ', error.message);
		});
}

if (!process.argv.slice(2).length) {
	program.outputHelp();
}