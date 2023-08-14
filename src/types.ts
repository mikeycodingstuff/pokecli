export interface Pokemon {
    id: number;
    name: string;
    types: PokemonType[];
    weight: number;
    height: number;
}

export interface PokemonType {
    slot: number;
    name: string;
}

export interface PokedexPokemonEntry {
    entry_number: number;
    pokemon_species: {
        name: string;
    };
}
