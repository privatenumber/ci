import { parsePnpmVersion } from './utils/detect-pnpm-version.ts';
import { parseLockVersion } from './utils/parse-lock-version.ts';
import { guessPnpmVersion } from './utils/guess-pnpm-version.ts';

type Options = {
	lockFiles: string[];
	nodeVersion: number[];
	packageManager?: string;
	lockFirstLine?: string;
};

export const resolvePackageManager = ({
	lockFiles,
	nodeVersion,
	packageManager,
	lockFirstLine,
}: Options) => {
	if (lockFiles.includes('package-lock.json')) {
		return {
			command: 'npm',
			args: ['ci'],
		};
	}

	if (lockFiles.includes('yarn.lock')) {
		return {
			command: 'npx',
			args: ['yarn', '--immutable'],
		};
	}

	if (lockFiles.includes('pnpm-lock.yaml')) {
		const pnpmVersion = (
			parsePnpmVersion(packageManager)
			?? guessPnpmVersion(
				nodeVersion,
				lockFirstLine ? parseLockVersion(lockFirstLine) : undefined,
			)
		);

		return {
			command: 'npx',
			args: [`pnpm${pnpmVersion}`, 'i', '--frozen-lockfile'],
		};
	}

	throw new Error('No lock file (package-lock.json, yarn.lock, pnpm-lock.yaml) found');
};
