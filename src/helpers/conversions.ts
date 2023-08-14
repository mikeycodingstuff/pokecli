const hectogramsToKilograms = (hgWeight: number): number => {
	const kgWeight = hgWeight * 0.1;

	return parseFloat(kgWeight.toFixed(2));
};

const decimetersToMeters = (dmHeight: number): number => {
	const mHeight = dmHeight * 10;

	return parseFloat(mHeight.toFixed(2));
};

export { hectogramsToKilograms, decimetersToMeters };
