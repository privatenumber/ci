import { parseVersionString } from './parse-version-string.ts';

export const parseLockVersion = (firstLine: string) => {
	const match = firstLine.match(/\d+\.\d+/);
	if (match) {
		return parseVersionString(match[0]);
	}
};
