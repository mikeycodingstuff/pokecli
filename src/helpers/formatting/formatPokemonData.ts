import { getAllPokemons } from '../../api/api';
import { ApiError } from '../../api/errors';
import { formatApiPokedexPokemonEntries } from './formatApiData';
import displayError from '../display/chalkErrorMessage';

const formatPokemonListData = async (): Promise<string[]> => {
	try {
		const data = await getAllPokemons();
		const pokemons = formatApiPokedexPokemonEntries(data.pokemon_entries);
		const displayNames = [];

		for (const pokemon of pokemons) {
			displayNames.push(`${pokemon.id}. ${pokemon.name}`);
		}

		return displayNames;
	} catch (error) {
		if (!(error instanceof ApiError)) {
			console.error(
				displayError('Unknown error occurred while fetching Pokemon'),
				error,
			);
		} else {
			console.error(displayError('Error fetching Pokemon:'), error.message);
		}

		process.exit(1);
	}
};

export { formatPokemonListData };
