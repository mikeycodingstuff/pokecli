import { JsonParseError } from '../../api/errors.js';
import { ApiPokedexPokemonEntry, Pokemon } from '../../types.js';
import chalkErrorMessage from '../display/chalkErrorMessage.js';

const mapApiDexPokemonEntryToPokemon = ((entries: ApiPokedexPokemonEntry[]): Pokemon[] => {
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

export { mapApiDexPokemonEntryToPokemon };
