import { NetworkError, JsonParseError } from './errors.js';
import { ApiPokedexPokemonEntry, ApiPokemonType, Pokemon, PokemonType } from '../types.js';
import chalkErrorMessage from '../helpers/display/chalkErrorMessage.js';

const API_BASE_URL = 'https://pokeapi.co/api/v2/';

const fetchData = async (path: string): Promise<Response> => {
	try {
		const response = await fetch(`${API_BASE_URL}${path}`);

		if (!response.ok) {
			throw new NetworkError(`Request failed - ${response.status} ${response.statusText}`);
		}

		return response;
	} catch (error) {
		if (error instanceof NetworkError) {
			console.error(chalkErrorMessage('Network error:'), error.message);
		} else {
			console.error(chalkErrorMessage('An unexpected error occurred:'));
		}

		process.exit(1);
	}
};

const getAllPokemons = async (): Promise<Pokemon[]> => {
	const response = await fetchData('pokedex/1');

	try {
		const data = await response.json();

		const pokemons = data.pokemon_entries.map((entry: ApiPokedexPokemonEntry): Pokemon => {
			return {
				id: entry.entry_number,
				name: entry.pokemon_species.name
			};
		});

		return pokemons;
	} catch (error) {
		throw new JsonParseError();
	}
};

const getRandomPokemon = async () => {
	const highestId = await getHighestPokemonId();
	const lowestId = await getLowestPokemonId();
	const randomId = getRandomId(lowestId, highestId);

	const response = await fetchData(`pokemon/${randomId}`);

	try {
		const data = await response.json();

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
		throw new JsonParseError();

	}
};

const getHighestPokemonId = async () => {
	const response = await fetchData('pokedex/1');

	try {
		const data = await response.json();
		const lastEntry = data.pokemon_entries[data.pokemon_entries.length - 1];

		return lastEntry.entry_number;
	} catch (error) {
		throw new JsonParseError();
	}
};

const getLowestPokemonId = async () => {
	const response = await fetchData('pokedex/1');

	try {
		const data = await response.json();
		const lastEntry = data.pokemon_entries[0];

		return lastEntry.entry_number;
	} catch (error) {
		throw new JsonParseError();
	}
};

const getRandomId = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { getAllPokemons, getRandomPokemon, API_BASE_URL };
