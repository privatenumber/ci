import { existsSync } from 'fs';
import { spawnSync } from 'child_process';
import { getPnpmVersion, type LockVersion, type NodeVersion } from './get-pnpm-version.js';
import firstline from 'firstline';

const parseVersionString = <Version>(versionString: string) => versionString.split('.').map(Number) as Version;

const getPnpmLockVersion = async () => {
	const lockFirstLine = await firstline('pnpm-lock.yaml');
	const lockFileVersion = lockFirstLine.match(/\d+\.\d+/);
	if (lockFileVersion) {
		return parseVersionString<LockVersion>(lockFileVersion[0]);
	}
};

export const ci = async () => {
	const options = {
		stdio: 'inherit' as const,
		shell: true,
	};

	if (existsSync('package-lock.json')) {
		return spawnSync('npm', ['ci'], options);
	}

	if (existsSync('yarn.lock')) {
		/**
		 * Using the latest yarn will detect the appropriate version to use via .yarnrc.yml
		 *
		 * Yarn projects actually check in the yarn binary at .yarn/releases
		 * https://yarnpkg.com/getting-started/install
		*/
		return spawnSync('npx', ['yarn', '--immutable'], options);
	}

	if (existsSync('pnpm-lock.yaml')) {
		const pnpmVersion = getPnpmVersion(
			parseVersionString<NodeVersion>(process.versions.node),
			await getPnpmLockVersion(),
		);
		return spawnSync(
			'npx',
			[`pnpm${pnpmVersion}`, 'i', '--frozen-lockfile'],
			options,
		);
	}

	throw new Error('Error: No lock file (package-lock.json, yarn.lock, pnpm-lock.yaml) found');
};
