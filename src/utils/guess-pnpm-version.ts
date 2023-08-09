import type { LockVersion, NodeVersion, PnpmVersion } from '../types.js';
import { compareSemver } from './compare-semver.js';

const pnpmVersions: [string, PnpmVersion][] = [
	['8', {
		// https://github.com/pnpm/pnpm/blob/v8.0.0/packages/types/package.json#L8
		node: [16, 14, 0],

		// https://github.com/pnpm/pnpm/blob/v8.0.0/packages/constants/src/index.ts#L2
		lock: [6, 0],
	}],
	['7', {
		// https://github.com/pnpm/pnpm/blob/v7.0.0/packages/types/package.json#L8
		node: [14, 19, 0],

		// https://github.com/pnpm/pnpm/blob/v7.0.0/packages/constants/src/index.ts#L2
		lock: [5, 4],
	}],
	['6', {
		// https://github.com/pnpm/pnpm/blob/v6.0.0/packages/types/package.json#L8
		node: [12, 17, 0],

		// https://github.com/pnpm/pnpm/blob/v6.0.0/packages/constants/src/index.ts#L2
		lock: [5, 3],
	}],
	['5', {
		// https://github.com/pnpm/pnpm/blob/v5.0.0/packages/types/package.json#L8
		node: [10, 13, 0],

		// https://github.com/pnpm/pnpm/blob/v5.0.0/packages/constants/src/index.ts#L2
		lock: [5, 1],
	}],
];

export const guessPnpmVersion = (
	nodeVersion: NodeVersion,
	lockfileVersion?: LockVersion,
) => {
	const compatibleVersion = pnpmVersions.find(([_version, { node: nodeMinimum, lock }]) => {
		const isCompatibleNodeVersion = compareSemver(nodeVersion, nodeMinimum) >= 0;
		const isCompatibleLockVersion = (
			!lockfileVersion
			|| compareSemver(lockfileVersion, lock) === 0
		);
		return isCompatibleNodeVersion && isCompatibleLockVersion;
	});

	const foundMatch = compatibleVersion;

	// Falls back to the currently installed version
	return foundMatch ? `@${foundMatch[0]}` : '';
};
