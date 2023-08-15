export interface Pokemon {
  id: number;
  name: string;
  types?: PokemonType[];
  weight?: number;
  height?: number;
}

export interface PokemonType {
  slot: number;
  name: string;
}

export interface ApiPokedexData {
  pokemon_entries: ApiPokedexPokemonEntry[];
}

export interface ApiPokedexPokemonEntry {
  entry_number: number;
  pokemon_species: {
    name: string;
  };
}

export interface ApiPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
