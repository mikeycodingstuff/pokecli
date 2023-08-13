import { getPokemon } from './api/pokemon.js';

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node index.js <pokemon_name_or_id>');
    return;
  }

  const query = args[0];

  try {
    const pokemonData = await getPokemon(query);
    console.log(pokemonData.types);
    console.log(`Name: ${pokemonData.name}`);
    console.log(`Height: ${pokemonData.height}`);
    console.log(`Weight: ${pokemonData.weight}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();