class ApiError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ApiError';
	}
}

class NetworkError extends ApiError {
	constructor(message: string) {
		super(message);
		this.name = 'NetworkError';
	}
}

class JsonParseError extends ApiError {
	constructor() {
		super('Error parsing response JSON');
		this.name = 'JsonParseError';
	}
}

export { ApiError, JsonParseError, NetworkError };
