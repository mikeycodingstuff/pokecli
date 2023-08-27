import chalk from 'chalk';

import { typeColors } from '../../config/config.js';
import type { Pokemon, PokemonType } from '../../types.js';
import {
	decimetersToMeters,
	hectogramsToKilograms,
} from '../number/conversions.js';
import capitalise from '../string/capitalise.js';

const displayPokemonList = (formattedNames: string[]): void => {
	const terminalWidth = process.stdout.columns || 80;
	const minColumnWidth = 20;

	const columns = Math.floor(terminalWidth / minColumnWidth);
	const columnWidth = Math.floor(terminalWidth / columns);

	for (let i = 0; i < formattedNames.length; i += columns) {
		const row = formattedNames.slice(i, i + columns);
		const formattedRow = row
			.map((name: string) => name.padEnd(columnWidth))
			.join('');
		console.log(formattedRow);
	}
};

const displayType = (type: string): string => {
	let color: string;

	if (type in typeColors) {
		color = typeColors[type];
	} else {
		color = '68a090';
	}

	return chalk.whiteBright.bgHex(color)(` ${type.toUpperCase()} `);
};

const displayPokemon = (pokemon: Pokemon): void => {
	const kgWeight = pokemon.weight
		? hectogramsToKilograms(pokemon.weight)
		: 'unknown';
	const mHeight = pokemon.height
		? decimetersToMeters(pokemon.height)
		: 'unknown';

	console.log(`  ID: ${pokemon.id}`);
	console.log(`  Name: ${capitalise(pokemon.name)}`);
	console.log(
		`  Type(s): ${pokemon.types
			?.map((type: PokemonType) => displayType(type.name))
			.join(', ')}`,
	);
	console.log(`  Weight: ${kgWeight}kg`);
	console.log(`  Height: ${mHeight}m`);
	console.log('');
};

export { displayPokemon, displayPokemonList, displayType };
