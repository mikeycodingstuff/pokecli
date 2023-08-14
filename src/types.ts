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

export interface PokedexPokemonEntry {
    entryNumber: number;
    pokemonSpecies: {
        name: string;
    };
}

export interface PokemonAPIType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
