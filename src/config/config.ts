import capitalise from '../helpers/capitalise.js';

const mainColor = '#7b62ac';
const cliName = 'pokemon-cli';
const cliNameHeader = 'pok\u00E9mon cli'.toUpperCase();
const author = 'mikey';
const authorFormatted = capitalise(author);
const pokemonText = 'pok\u00E9mon';
const pokemonTextCaps = capitalise(pokemonText);
const typeColors: Record<string, string> = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

export {
	mainColor,
	cliName,
	cliNameHeader,
	author,
	authorFormatted,
	pokemonText,
	pokemonTextCaps,
	typeColors
};
