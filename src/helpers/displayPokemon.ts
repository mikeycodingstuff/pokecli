import { Pokemon } from '../types.js';
import capitalise from './capitalise.js';

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
	const formattedOutput = `  ID: ${pokemon.id}
  Name: ${capitalise(pokemon.name)}
  Types: ${pokemon.types?.map(type => `${type.name}`.toUpperCase()).join(', ')}
  Weight: ${pokemon.weight} 
  Height: ${pokemon.height} 
	`;

	console.log(formattedOutput);
};

export { displayPokemonList, displayPokemon };
