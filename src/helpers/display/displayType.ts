import { PokemonType } from '../../types.js';
import { displayType } from '../display/displayPokemon.js';

const displayTypeList = (formattedTypes: PokemonType[]): void => {
	const typeNames = formattedTypes.map((type: PokemonType) =>
		displayType(type.name),
	);

	const joinedTypeNames = typeNames.join(', ');
	console.log(` ${joinedTypeNames} `);
};

export { displayTypeList };
