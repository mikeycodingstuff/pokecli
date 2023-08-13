const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

async function getPokemon(query) {
  try {
    const response = await fetch(`${BASE_URL}/${query.toLowerCase()}`);
    if (!response.ok) {
      throw new Error('Pokémon not found.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export { getPokemon };