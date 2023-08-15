import { JsonParseError } from '../../api/errors.js';
import { ApiPokedexPokemonEntry, Pokemon, PokemonType, ApiPokemonType, ApiPokemon } from '../../types.js';
import chalkErrorMessage from '../display/chalkErrorMessage.js';

const formatApiPokedexPokemonEntries = ((entries: ApiPokedexPokemonEntry[]): Pokemon[] => {
	try {
		return entries.map((entry: ApiPokedexPokemonEntry): Pokemon => {
			return {
				id: entry.entry_number,
				name: entry.pokemon_species.name
			};
		});
	} catch (error) {
		if (error instanceof JsonParseError) {
			console.error(chalkErrorMessage(error.message));
		} else {
			console.error(chalkErrorMessage('An unexpected error occurred:'));
		}

		process.exit(1);
	}
});

const formatPokemonData = (data: ApiPokemon): Pokemon => {
	try {
		console.log(data);
		const types: PokemonType[] = data.types.map((typeData: ApiPokemonType) => {
			return {
				slot: typeData.slot,
				name: typeData.type.name
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
		if (error instanceof JsonParseError) {
			console.error(chalkErrorMessage(error.message));
		} else {
			console.error(chalkErrorMessage('An unexpected error occurred:'));
		}

		process.exit(1);
	}
};

export { formatApiPokedexPokemonEntries, formatPokemonData };
