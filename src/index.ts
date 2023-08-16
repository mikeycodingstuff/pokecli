#!/usr/bin/env node

import { Command } from 'commander';

import cliSetup from './cliFunctions/cliSetup.js';
import { handleOptions } from './cliFunctions/handleInputs.js';

const program = new Command();
const options = program.opts();

const main = (): void => {
	cliSetup(program);
	handleOptions(options);
};

main();
