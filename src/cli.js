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

const options = {
	stdio: 'inherit',
	shell: true,
};

let spawned;

const packageManager = getPackageManager();
if (packageManager) {
	const [packageManagerName] = packageManager.split('@');

	switch (packageManagerName) {
		case 'npm': {
			spawned = spawnSync('npx', [packageManager, 'ci'], options);
			break;
		}
		case 'yarn': {
			/**
			 * Using the latest yarn will detect the appropriate version to use via .yarnrc.yml
			 *
			 * Yarn projects actually check in the yarn binary at .yarn/releases
			 * https://yarnpkg.com/getting-started/install
			*/
			spawned = spawnSync('npx', ['yarn', '--immutable'], options);
			break;
		}
		case 'pnpm': {
			spawned = spawnSync(
				'npx',
				[packageManager, 'i', '--frozen-lockfile'],
				options,
			);
			break;
		}
		default: {
			console.error(`Error: unknown packageManager ${packageManagerName}`);
			process.exit(1);
		}
	}
} else if (existsSync('package-lock.json')) {
	spawned = spawnSync('npm', ['ci'], options);
} else if (existsSync('yarn.lock')) {
	spawned = spawnSync('npx', ['yarn', '--immutable'], options);
} else if (existsSync('pnpm-lock.yaml')) {
	const nodeVersion = process.version
		.slice(1)
		.split('.')
		.map(v => Number.parseInt(v, 10));

	const pnpmVersion = getPnpmVersion(nodeVersion);
	spawned = spawnSync(
		'npx',
		[`pnpm@${pnpmVersion}`, 'i', '--frozen-lockfile'],
		options,
	);
} else {
	console.error('Error: No lock file (package-lock.json, yarn.lock, pnpm-lock.yaml) found');
	process.exit(1);
}

process.exit(spawned.status);
