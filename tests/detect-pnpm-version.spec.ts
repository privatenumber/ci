import { test, expect } from 'manten';
import { parsePnpmVersion } from '../src/utils/detect-pnpm-version.ts';

test('parsePnpmVersion', () => {
	// Returns version suffix when packageManager is pnpm
	expect(parsePnpmVersion('pnpm@8.0.0')).toBe('@8.0.0');
	expect(parsePnpmVersion('pnpm@9.1.0+sha512.abc123')).toBe('@9.1.0+sha512.abc123');

	// Returns undefined for non-pnpm
	expect(parsePnpmVersion('npm@10.0.0')).toBeUndefined();
	expect(parsePnpmVersion('yarn@4.0.0')).toBeUndefined();

	// Returns undefined when no packageManager
	expect(parsePnpmVersion(undefined)).toBeUndefined();
	expect(parsePnpmVersion('')).toBeUndefined();
});
