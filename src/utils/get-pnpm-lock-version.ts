import firstline from 'firstline';
import type { LockVersion } from '../types.js';
import { parseVersionString } from './parse-version-string.js';

export const getPnpmLockVersion = async () => {
	const lockFirstLine = await firstline('pnpm-lock.yaml');
	const lockFileVersion = lockFirstLine.match(/\d+\.\d+/);
	if (lockFileVersion) {
		return parseVersionString<LockVersion>(lockFileVersion[0]);
	}
};
