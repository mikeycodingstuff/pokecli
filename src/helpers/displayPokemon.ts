import { Pokemon } from '../types.js';
import capitalise from './capitalise.js';
import { hectogramsToKilograms, decimetersToMeters } from '../helpers/conversions.js';

const displayPokemonList = (formattedNames: string[]): void => {
	const terminalWidth = process.stdout.columns || 80;
	const minColumnWidth = 20;

	const columns = Math.floor(terminalWidth / minColumnWidth);
	const columnWidth = Math.floor(terminalWidth / columns);

	for (let i = 0; i < formattedNames.length; i += columns) {
		const row = formattedNames.slice(i, i + columns);
		const formattedRow = row.map((name: string) => name.padEnd(columnWidth)).join('');
		console.log(formattedRow);
	}
};

const displayPokemon = (pokemon: Pokemon): void => {
	const kgWeight = pokemon.weight ? hectogramsToKilograms(pokemon.weight) : 'unknown';
	const mHeight = pokemon.height ? decimetersToMeters(pokemon.height) : 'unknown';

	console.log(`  ID: ${pokemon.id}`);
	console.log(`  Name: ${capitalise(pokemon.name)}`);
	console.log(`  Types: ${pokemon.types?.map(type => `${type.name}`.toUpperCase()).join(', ')}`);
	console.log(`  Weight: ${kgWeight}kg`);
	console.log(`  Height: ${mHeight}m`);
};

export { displayPokemonList, displayPokemon };
