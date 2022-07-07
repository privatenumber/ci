import { existsSync } from 'fs';
import { spawnSync } from 'child_process';
import { getPnpmVersion } from './get-pnpm-version.js';

const options = {
	stdio: 'inherit',
	shell: true,
};

let spawned;

if (existsSync('package-lock.json')) {
	spawned = spawnSync('npm', ['ci'], options);
} else if (existsSync('yarn.lock')) {
	spawned = spawnSync('npx', ['yarn', 'install', '--immutable'], options);
} else if (existsSync('pnpm-lock.yaml')) {
	const nodeVersion = process.version.slice(1).split('.').map(v => Number.parseInt(v, 10));

	const pnpmVersion = getPnpmVersion(nodeVersion);
	spawned = spawnSync('npx', [`pnpm@${pnpmVersion}`, 'i', '--frozen-lockfile'], options);
} else {
	console.error('Error: No lock file (package-lock.json, yarn.lock, pnpm-lock.yaml) found');
	process.exit(1);
}

process.exit(spawned.status);
