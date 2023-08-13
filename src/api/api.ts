import { ApiError, NetworkError, JsonParseError } from './errors.js';

const API_BASE_URL = 'https://pokeapi.co/api/v2/';

const getAllPokemon = async () => {
	try {
		const response = await fetch(`${API_BASE_URL}/pokemon`);

		if (!response.ok) {
			throw new NetworkError(`Request failed - ${response.status} ${response.statusText}`);
		}

		try {
			const data = await response.json();
			return data;
		} catch (error) {
			throw new JsonParseError();
		}
	} catch (error: any) {
		throw new ApiError(error.message);
	}
}

export { getAllPokemon, API_BASE_URL };
