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
