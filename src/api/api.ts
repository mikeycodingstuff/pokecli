import { NetworkError, JsonParseError } from './errors.js';
import { PokedexPokemonEntry, PokemonAPIType, Pokemon, PokemonType } from '../types.js';

const API_BASE_URL = 'https://pokeapi.co/api/v2/';

const fetchData = async (path: string): Promise<Response> => {
	const response = await fetch(`${API_BASE_URL}${path}`);

	if (!response.ok) {
		throw new NetworkError(`Request failed - ${response.status} ${response.statusText}`);
	}

	return response;
};

const getAllPokemons = async (): Promise<Pokemon[]> => {
	const response = await fetchData('pokedex/1');

	try {
		const data = await response.json();

		const pokemons = data.pokemon_entries.map((entry: PokedexPokemonEntry): Pokemon => {
			return {
				id: entry.entryNumber,
				name: entry.pokemonSpecies.name
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

		const types: PokemonType[] = data.types.map((typeData: PokemonAPIType) => {
			return {
				slot: typeData.slot,
				name: typeData.type.name
			};
		});

		const pokemon: Pokemon =  {
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

		return lastEntry.entryNumber;
	} catch (error) {
		throw new JsonParseError();
	}
};

const getLowestPokemonId = async () => {
	const response = await fetchData('pokedex/1');

	try {
		const data = await response.json();
		const lastEntry = data.pokemon_entries[0];

		return lastEntry.entryNumber;
	} catch (error) {
		throw new JsonParseError();
	}
};

const getRandomId = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { getAllPokemons, getRandomPokemon, API_BASE_URL };
