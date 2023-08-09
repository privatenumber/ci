import { readFileSync } from 'fs';

/**
 * This is specific to pnpm because it's the only package manager with
 * incompatibility between the lockfile and the package manager version.
 *
 * The source of truth is still the lock file type because `npm ci` only
 * installs from the lock file.
 *
 * packageManager detection was previously reverted:
 * https://github.com/privatenumber/ci/pull/12
 *
 * That's to say if there's a package-lock.json, but the packageManager
 * is pnpm, then we'll still use npm.
 */
export const detectPnpmVersionFromPackageManager = () => {
	try {
		const { packageManager } = JSON.parse(readFileSync('package.json', 'utf8'));
		if (packageManager.startsWith('pnpm')) {
			return packageManager.slice(4);
		}
	} catch {}
};
