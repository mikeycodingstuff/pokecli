import { PokemonType } from '../../types.js';
import { displayType } from '../display/displayPokemon.js';

const displayTypeList = (formattedTypes: PokemonType[]): void => {
	const typeNames = formattedTypes.map((type: PokemonType) => type.name);

	for (const name of typeNames) {
		console.log(displayType(name));
	}
};

export { displayTypeList };
