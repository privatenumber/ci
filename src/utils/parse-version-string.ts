export const parseVersionString = <Version>(
	versionString: string,
) => versionString.split('.').map(Number) as Version;
