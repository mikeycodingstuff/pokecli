import { JsonParseError } from '../../api/errors.js';
import {
	ApiPokedexPokemonEntry,
	ApiPokemon,
	ApiPokemonType,
	Pokemon,
	PokemonType,
} from '../../types.js';
import chalkErrorMessage from '../display/chalkErrorMessage.js';

const formatApiPokedexPokemonEntries = (
	entries: ApiPokedexPokemonEntry[],
): Pokemon[] => {
	try {
		return entries.map((entry: ApiPokedexPokemonEntry): Pokemon => {
			return {
				id: entry.entry_number,
				name: entry.pokemon_species.name,
			};
		});
	} catch (error) {
		if (!(error instanceof JsonParseError)) {
			console.error(chalkErrorMessage('An unexpected error occurred.'));
		} else {
			console.error(chalkErrorMessage(`${error.name} error:`), error.message);
		}

		process.exit(1);
	}
};

const formatPokemonData = (data: ApiPokemon): Pokemon => {
	try {
		const types: PokemonType[] = data.types.map((typeData: ApiPokemonType) => {
			return {
				slot: typeData.slot,
				name: typeData.type.name,
			};
		});

		const pokemon: Pokemon = {
			id: data.id,
			name: data.name,
			types: types,
			weight: data.weight,
			height: data.height,
		};

		return pokemon;
	} catch (error) {
		if (!(error instanceof JsonParseError)) {
			console.error(chalkErrorMessage('An unexpected error occurred:'));
		} else {
			console.error(chalkErrorMessage(error.message));
		}

		process.exit(1);
	}
};

export { formatApiPokedexPokemonEntries, formatPokemonData };
