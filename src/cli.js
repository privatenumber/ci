import { existsSync } from 'fs';
import { spawnSync } from 'child_process';
import { getPnpmVersion } from './get-pnpm-version.js';

const options = {
	stdio: 'inherit',
	shell: true,
};

let spawned;

const packageJson = existsSync('./package.json') && require('./package.json');

if (
	packageJson
	&& 'packageManager' in packageJson
) {
	const { packageManager } = packageJson;

	if (typeof packageManager !== 'string') {
		console.error(`Error: Invalid \`packageManager\` field setting ${packageManager}`);
		process.exit(1);
	}

	const parts = packageManager.split('@');

	if (parts.length !== 2) {
		console.error(`Error: Invalid \`packageManager\` field setting${packageManager}`);
		process.exit(1);
	}

	const pm = parts[0];

	switch (pm) {
		case 'npm': {
			spawned = spawnSync('npx', [packageManager, 'ci'], options);
			break;
		}
		case 'yarn': {
			// `yarn@3` is not available on npm
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
			console.error(`Error: unknown package manager ${pm}`);
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
