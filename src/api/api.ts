import { ApiError, NetworkError, JsonParseError } from './errors.js';

const API_BASE_URL = 'https://pokeapi.co/api/v2/';

interface PokemonEntry {
	entry_number: number;
	pokemon_species: {
		name: string;
	};
}

const getAllPokemon = async () => {
	try {
		const response = await fetch(`${API_BASE_URL}/pokedex/1`);

		if (!response.ok) {
			throw new NetworkError(`Request failed - ${response.status} ${response.statusText}`);
		}

		try {
			const data = await response.json();

			const pokemons = data.pokemon_entries.map((entry: PokemonEntry) => {
				return {
					id: entry.entry_number,
					name: entry.pokemon_species.name
				};
			});

			return pokemons;
		} catch (error) {
			throw new JsonParseError();
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new ApiError(error.message);
		} else {
			throw new Error('Unknown error occurred');
		}
	}
};

export { getAllPokemon, API_BASE_URL };
