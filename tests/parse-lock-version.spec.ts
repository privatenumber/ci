import { test, expect } from 'manten';
import { parseLockVersion } from '../src/utils/parse-lock-version.ts';

test('parseLockVersion', () => {
	// Standard lockfile first lines
	expect(parseLockVersion('lockfileVersion: 5.4')).toEqual([5, 4]);
	expect(parseLockVersion("lockfileVersion: '6.0'")).toEqual([6, 0]);
	expect(parseLockVersion("lockfileVersion: '9.0'")).toEqual([9, 0]);

	// No version found
	expect(parseLockVersion('')).toBeUndefined();
	expect(parseLockVersion('# some comment')).toBeUndefined();
});
