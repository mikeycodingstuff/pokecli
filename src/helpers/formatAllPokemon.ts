import displayError from './displayError.js';
import * as api from '../api/api.js';
import { ApiError } from '../api/errors.js';

const formatAllPokemonData = async () => {
	try {
		const pokemons = await api.getAllPokemon();
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

export default formatAllPokemonData;
