import { PokemonType } from '../../types.js';
import { displayType } from '../display/displayPokemon.js';

const displayTypeList = (formattedTypes: PokemonType[]): void => {
	for (const type of formattedTypes) {
		console.log(displayType(type.name));
	}
};

export { displayTypeList };
