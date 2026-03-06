import firstline from 'firstline';
import type { LockVersion } from '../types.ts';
import { parseVersionString } from './parse-version-string.ts';

export const getPnpmLockVersion = async () => {
	const lockFirstLine = await firstline('pnpm-lock.yaml');
	const lockFileVersion = lockFirstLine.match(/\d+\.\d+/);
	if (lockFileVersion) {
		return parseVersionString<LockVersion>(lockFileVersion[0]);
	}
};
