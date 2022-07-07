import { existsSync } from 'fs';
import { spawnSync } from 'child_process';
import { getPnpmVersion } from './get-pnpm-version.js';

function getPackageManager() {
	try {
		// eslint-disable-next-line node/global-require,import/no-unresolved
		const { packageManager } = require('./package.json');
		if (
			typeof packageManager === 'string'
			&& packageManager.includes('@')
		) {
			return packageManager;
		}
	} catch {}
}

const npx = 'npx';

export function ci() {
	const options = {
		stdio: 'inherit',
		shell: true,
	};

	const packageManager = getPackageManager();
	if (packageManager) {
		const [packageManagerName] = packageManager.split('@');

		if (packageManagerName === 'npm') {
			return spawnSync(npx, [packageManager, 'ci'], options);
		}

		if (packageManagerName === 'yarn') {
			/**
			 * Using the latest yarn will detect the appropriate version to use via .yarnrc.yml
			 *
			 * Yarn projects actually check in the yarn binary at .yarn/releases
			 * https://yarnpkg.com/getting-started/install
			*/
			return spawnSync(npx, ['yarn', '--immutable'], options);
		}

		if (packageManagerName === 'pnpm') {
			return spawnSync(
				npx,
				[packageManager, 'i', '--frozen-lockfile'],
				options,
			);
		}

		console.warn(`Error: unknown packageManager ${packageManagerName}`);
	}

	if (existsSync('package-lock.json')) {
		return spawnSync('npm', ['ci'], options);
	}

	if (existsSync('yarn.lock')) {
		return spawnSync(npx, ['yarn', '--immutable'], options);
	}

	if (existsSync('pnpm-lock.yaml')) {
		const nodeVersion = process.version
			.slice(1)
			.split('.')
			.map(v => Number.parseInt(v, 10));

		const pnpmVersion = getPnpmVersion(nodeVersion);
		return spawnSync(
			npx,
			[`pnpm@${pnpmVersion}`, 'i', '--frozen-lockfile'],
			options,
		);
	}

	throw new Error('Error: No lock file (package-lock.json, yarn.lock, pnpm-lock.yaml) found');
}
