import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolvePackageManager } from './resolve-package-manager.ts';

const lockFileNames = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];

const readFirstLine = (filePath: string) => {
	const file = readFileSync(filePath, 'utf8');
	return file.slice(0, file.indexOf('\n'));
};

export const ci = () => {
	const lockFiles = lockFileNames.filter(existsSync);

	let packageManager: string | undefined;
	try {
		({ packageManager } = JSON.parse(readFileSync('package.json', 'utf8')));
	} catch {}

	const lockFirstLine = lockFiles.includes('pnpm-lock.yaml')
		? readFirstLine('pnpm-lock.yaml')
		: undefined;

	const { command, args } = resolvePackageManager({
		lockFiles,
		nodeVersion: process.versions.node.split('.').map(Number),
		packageManager,
		lockFirstLine,
	});

	return spawnSync(command, args, {
		stdio: 'inherit',
		shell: true,
	});
};
