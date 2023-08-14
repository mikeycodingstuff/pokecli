import capitalise from '../helpers/capitalise.js';

const mainColor = '#7b62ac';
const cliName = 'pokemon-cli';
const cliNameHeader = 'pok\u00E9mon cli'.toUpperCase();
const author = 'mikey';
const authorFormatted = capitalise(author);
const pokemonText = 'pok\u00E9mon';
const pokemonTextCaps = capitalise(pokemonText);

export {
	mainColor,
	cliName,
	cliNameHeader,
	author,
	authorFormatted,
	pokemonText,
	pokemonTextCaps,
};
