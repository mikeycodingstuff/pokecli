import displayError from './displayError.js';
import * as api from '../api/api.js';
import { ApiError } from '../api/errors.js';

const formatPokemonListData = async () => {
	try {
		const pokemons = await api.getAllPokemons();
		const displayNames = [];

		for (const pokemon of pokemons) {
			displayNames.push(`${pokemon.id}. ${pokemon.name}`);
		}

		return displayNames;
	} catch (error) {
		if (error instanceof ApiError) {
			displayError(`Error fetching Pokemon: ${error.message}`);
		} else {
			displayError('Unknown error occurred while fetching Pokemon');
		}

		process.exit(1);
	}
};

const formatRandomPokemonData = async () => {
	try {
		const pokemon = await api.getRandomPokemon();

		return pokemon;
	} catch (error) {
		if (error instanceof ApiError) {
			displayError(`Error fetching Pokemon: ${error.message}`);
		} else {
			displayError('Unknown error occurred while fetching Pokemon');
		}

		process.exit(1);
	}
};

export { formatPokemonListData, formatRandomPokemonData };
