import { existsSync } from 'fs';
import { spawnSync } from 'child_process';
import { detectPnpmVersionFromPackageManager } from './utils/detect-pnpm-version-from-package-manager.js';
import { guessPnpmVersion } from './utils/guess-pnpm-version.js';
import { getPnpmLockVersion } from './utils/get-pnpm-lock-version.js';
import { parseVersionString } from './utils/parse-version-string.js';
import type { NodeVersion } from './types.js';

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
		const pnpmVersion = (
			detectPnpmVersionFromPackageManager()
			|| guessPnpmVersion(
				parseVersionString<NodeVersion>(process.versions.node),
				await getPnpmLockVersion(),
			)
		);

		return spawnSync(
			'npx',
			[`pnpm${pnpmVersion}`, 'i', '--frozen-lockfile'],
			options,
		);
	}

	throw new Error('Error: No lock file (package-lock.json, yarn.lock, pnpm-lock.yaml) found');
};
