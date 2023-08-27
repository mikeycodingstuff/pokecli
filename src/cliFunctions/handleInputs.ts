import { OptionValues } from 'commander';

import {
	getPokemonById,
	getPokemonByName,
	getPokemonTypes,
	getRandomPokemon,
} from '../api/api.js';
import { pokemonTextCapitalised } from '../config/config.js';
import {
	displayPokemon,
	displayPokemonList,
} from '../helpers/display/displayPokemon.js';
import { displayTypeList } from '../helpers/display/displayType.js';
import { header } from '../helpers/display/headers.js';
import {
	formatPokemonData,
	formatPokemonTypesData,
} from '../helpers/formatting/formatApiData.js';
import { formatPokemonListData } from '../helpers/formatting/formatPokemonData.js';
import convertToNumberOrString from '../helpers/string/convertToNumberOrString.js';
import type { ApiPokemon } from '../types.js';

const handleOptions = (options: OptionValues): void => {
	if (options.all) {
		handleAllPokemon();
	}

	if (options.random) {
		handleRandomPokemon();
	}
};

const handleAllPokemon = async (): Promise<void> => {
	const pokemons = await formatPokemonListData();
	header(`All ${pokemonTextCapitalised}:`);
	displayPokemonList(pokemons);
};

const handleRandomPokemon = async (): Promise<void> => {
	const data = await getRandomPokemon();
	handleSinglePokemon(data, true);
};

const handleSinglePokemon = (
	data: ApiPokemon,
	random: boolean = false,
): void => {
	const pokemon = formatPokemonData(data);
	const headerText = random
		? ` Random ${pokemonTextCapitalised}: `
		: ` ${pokemonTextCapitalised}: `;
	header(headerText);
	displayPokemon(pokemon);
};

const handlePokemonIdOrName = async (input: string): Promise<undefined> => {
	if (!input || input === 'help') {
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

const handleTypeCommand = (input: string): void => {
	if (input == 'all') {
		handleAllTypes();
	}
};

const handleAllTypes = async (): Promise<void> => {
	const data = await getPokemonTypes();
	const types = formatPokemonTypesData(data);

	header(`All ${pokemonTextCapitalised} Types:`);
	displayTypeList(types);
};

export { handleOptions, handlePokemonIdOrName, handleTypeCommand };
