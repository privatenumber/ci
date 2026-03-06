import { compareSemver } from './compare-semver.ts';

type PnpmVersionConstraint = {
	node: number[];
	lock: number[];
};

const pnpmVersions: [string, PnpmVersionConstraint][] = [
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
	nodeVersion: number[],
	lockfileVersion?: number[],
) => {
	const match = pnpmVersions.find(([, { node: nodeMinimum, lock }]) => {
		const isCompatibleNodeVersion = compareSemver(nodeVersion, nodeMinimum) >= 0;
		const isCompatibleLockVersion = (
			!lockfileVersion
			|| compareSemver(lockfileVersion, lock) === 0
		);
		return isCompatibleNodeVersion && isCompatibleLockVersion;
	});

	return match ? `@${match[0]}` : '';
};
