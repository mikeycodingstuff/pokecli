import { NetworkError, JsonParseError } from './errors.js';
import { PokedexPokemonEntry } from '../types.js';

const API_BASE_URL = 'https://pokeapi.co/api/v2/';

const fetchData = async (path: string) => {
	const response = await fetch(`${API_BASE_URL}${path}`);

	if (!response.ok) {
		throw new NetworkError(`Request failed - ${response.status} ${response.statusText}`);
	}

	return response;
};

const getAllPokemons = async () => {
	const response = await fetchData('pokedex/1');

	try {
		const data = await response.json();

		const pokemons = data.pokemon_entries.map((entry: PokedexPokemonEntry) => {
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
	const highest_id = await getHighestPokemonId();
	const lowest_id = await getLowestPokemonId();
	const random_id = getRandomId(lowest_id, highest_id);

	const response = await fetchData(`pokemon/${random_id}`);

	try {
		const data = await response.json();

		return data;
	} catch (error) {
		throw new JsonParseError();
	}
};

const getHighestPokemonId = async () => {
	const response = await fetchData('pokedex/1');

	try {
		const data = await response.json();
		const last_entry = data.pokemon_entries[data.pokemon_entries.length - 1];

		return last_entry.entry_number;
	} catch (error) {
		throw new JsonParseError();
	}
};

const getLowestPokemonId = async () => {
	const response = await fetchData('pokedex/1');

	try {
		const data = await response.json();
		const last_entry = data.pokemon_entries[0];

		return last_entry.entry_number;
	} catch (error) {
		throw new JsonParseError();
	}
};

const getRandomId = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { getAllPokemons, getRandomPokemon, API_BASE_URL };
