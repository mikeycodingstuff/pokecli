import { NetworkError, JsonParseError } from './errors.js';
import { ApiPokedexData } from '../types.js';
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
		if (!(error instanceof NetworkError)) {
			console.error(chalkErrorMessage('An unexpected error occurred:'), error);
		} else {
			console.error(chalkErrorMessage(`${error.name} error:`), error.message);
		}

		process.exit(1);
	}
};

const getAllPokemons = async (): Promise<ApiPokedexData> => {
	const response = await fetchData('pokedex/1');

	try {
		const data = await response.json();

		return data;
	} catch (error) {
		throw new JsonParseError();
	}
};

const getRandomPokemon = async () => {
	try {
		const highestId = await getHighestPokemonId();
		const lowestId = await getLowestPokemonId();
		const randomId = getRandomId(lowestId, highestId);

		const response = await fetchData(`pokemon/${randomId}`);
		const data = await response.json();

		return data;
	} catch (error) {
		if (!(error instanceof NetworkError || error instanceof JsonParseError)) {
			console.error(chalkErrorMessage('An unexpected error occurred.'));
		} else {
			console.error(chalkErrorMessage(`${error.name} error:`), error.message);
		}

		process.exit(1);
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
