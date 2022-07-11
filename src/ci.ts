import { existsSync } from 'fs';
import { spawnSync } from 'child_process';
import { getPnpmVersion, type Version } from './get-pnpm-version';

export function ci() {
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
		const nodeVersion = process.versions.node.split('.').map(Number) as Version;
		const pnpmVersion = getPnpmVersion(nodeVersion);
		return spawnSync(
			'npx',
			[`pnpm@${pnpmVersion}`, 'i', '--frozen-lockfile'],
			options,
		);
	}

	throw new Error('Error: No lock file (package-lock.json, yarn.lock, pnpm-lock.yaml) found');
}
