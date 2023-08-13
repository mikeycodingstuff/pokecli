#! /usr/bin/env node
import { Command } from 'commander';

import header from './helpers/header.js';

const program = new Command();

program
	.name('pokemon')
	.version('1.0.0')
	.description('A command line tool that shows pokemon info by consuming the pokemon API (found at https://pokeapi.co/)')
	.option('-a, --all', 'List all pokemon')
	.addHelpText('before', header);

program.parse(process.argv);

console.log(header);