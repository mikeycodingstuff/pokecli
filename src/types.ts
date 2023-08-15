interface Pokemon {
	id: number;
	name: string;
	types?: PokemonType[];
	weight?: number;
	height?: number;
}

interface PokemonType {
	slot: number;
	name: string;
}

interface ApiPokedexData {
	pokemon_entries: ApiPokedexPokemonEntry[];
}

interface ApiPokedexPokemonEntry {
	entry_number: number;
	pokemon_species: {
		name: string;
	};
}

interface ApiPokemon {
	id: number;
	name: string;
	types: ApiPokemonType[];
	weight: number;
	height: number;
}

interface ApiPokemonType {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}

export {
	Pokemon,
	PokemonType,
	ApiPokedexData,
	ApiPokedexPokemonEntry,
	ApiPokemon,
	ApiPokemonType,
};
