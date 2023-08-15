import displayError from '../display/chalkErrorMessage.js';
import * as api from '../../api/api.js';
import { ApiError } from '../../api/errors.js';
import { formatApiPokedexPokemonEntries } from './formatApiData.js';

const formatPokemonListData = async () => {
	try {
		const data = await api.getAllPokemons();
		const pokemons = formatApiPokedexPokemonEntries(data.pokemon_entries);
		const displayNames = [];

		for (const pokemon of pokemons) {
			displayNames.push(`${pokemon.id}. ${pokemon.name}`);
		}

		return displayNames;
	} catch (error) {
		if (!(error instanceof ApiError)) {
			console.error(displayError('Unknown error occurred while fetching Pokemon'), error);
		} else {
			console.error(displayError('Error fetching Pokemon:'), error.message);
		}

		process.exit(1);
	}
};

export { formatPokemonListData };
