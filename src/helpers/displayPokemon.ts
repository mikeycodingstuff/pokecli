import { header } from './headers.js';

const displayPokemonList = (formattedNames: string[]): void => {
	const terminalWidth = process.stdout.columns || 80;
	const minColumnWidth = 20;

	const columns = Math.floor(terminalWidth / minColumnWidth);
	const columnWidth = Math.floor(terminalWidth / columns);

	header('All Pokemon:');

	for (let i = 0; i < formattedNames.length; i += columns) {
		const row = formattedNames.slice(i, i + columns);
		const formattedRow = row.map((name: string) => name.padEnd(columnWidth)).join('');
		console.log(formattedRow);
	}
};

export { displayPokemonList };
