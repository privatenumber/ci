export const parseVersionString = (
	versionString: string,
) => versionString.split('.').map(Number);
