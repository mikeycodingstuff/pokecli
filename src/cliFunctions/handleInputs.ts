import { OptionValues } from 'commander';

import {
	getPokemonById,
	getPokemonByName,
	getRandomPokemon,
} from '../api/api.js';
import { pokemonTextCaps } from '../config/config.js';
import {
	displayPokemon,
	displayPokemonList,
} from '../helpers/display/displayPokemon.js';
import { header } from '../helpers/display/headers.js';
import { formatPokemonData } from '../helpers/formatting/formatApiData.js';
import { formatPokemonListData } from '../helpers/formatting/formatPokemonData.js';
import convertToNumberOrString from '../helpers/string/convertToNumberOrString.js';
import type { ApiPokemon } from '../types.js';

const handleOptions = (options: OptionValues): void => {
	if (options.all) {
		handleAll();
	}

	if (options.random) {
		handleRandom();
	}
};

const handleAll = async (): Promise<void> => {
	const pokemons = await formatPokemonListData();
	header(`All ${pokemonTextCaps}:`);
	displayPokemonList(pokemons);
};

const handleRandom = async (): Promise<void> => {
	const data = await getRandomPokemon();
	handleSinglePokemon(data, true);
};

const handleSinglePokemon = async (
	data: ApiPokemon,
	random: boolean = false,
): Promise<void> => {
	const pokemon = await formatPokemonData(data);
	const headerText = random
		? ` Random ${pokemonTextCaps}: `
		: ` ${pokemonTextCaps}: `;
	header(headerText);
	displayPokemon(pokemon);
};

const handlePokemonIdOrName = async (input: string): Promise<undefined> => {
	if (!input) {
		return;
	}

	const parsedInput = convertToNumberOrString(input);

	if (typeof parsedInput === 'string') {
		const name = parsedInput.toLowerCase();
		const data = await getPokemonByName(name);
		handleSinglePokemon(data);
	}

	if (typeof parsedInput === 'number') {
		const id = parsedInput;
		const data = await getPokemonById(id);
		handleSinglePokemon(data);
	}
};

export { handleOptions, handlePokemonIdOrName };
