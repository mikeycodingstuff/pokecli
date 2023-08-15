import capitalise from '../helpers/string/capitalise.js';

const mainColor = '#7b62ac';
const cliName = 'pokemon-cli';
const cliNameHeader = 'pok\u00E9mon cli'.toUpperCase();
const author = 'mikey';
const authorFormatted = capitalise(author);
const pokemonText = 'pok\u00E9mon';
const pokemonTextCaps = capitalise(pokemonText);
const typeColors: Record<string, string> = {
	normal: '#A8A878',
	fire: '#F08030',
	water: '#6890F0',
	electric: '#F8D030',
	grass: '#78C850',
	ice: '#98D8D8',
	fighting: '#C03028',
	poison: '#A040A0',
	ground: '#E0C068',
	flying: '#A890F0',
	psychic: '#F85888',
	bug: '#A8B820',
	rock: '#B8A038',
	ghost: '#705898',
	dragon: '#7038F8',
	dark: '#705848',
	steel: '#B8B8D0',
	fairy: '#EE99AC',
};

export {
	mainColor,
	cliName,
	cliNameHeader,
	author,
	authorFormatted,
	pokemonText,
	pokemonTextCaps,
	typeColors,
};
