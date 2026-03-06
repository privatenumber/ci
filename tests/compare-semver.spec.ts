import { test, expect } from 'manten';
import { compareSemver } from '../src/utils/compare-semver.ts';

test('compareSemver', () => {
	// Equal versions
	expect(compareSemver([1, 0, 0], [1, 0, 0])).toBe(0);

	// Major differs
	expect(compareSemver([2, 0, 0], [1, 0, 0])).toBeGreaterThan(0);
	expect(compareSemver([1, 0, 0], [2, 0, 0])).toBeLessThan(0);

	// Minor differs
	expect(compareSemver([1, 2, 0], [1, 1, 0])).toBeGreaterThan(0);
	expect(compareSemver([1, 1, 0], [1, 2, 0])).toBeLessThan(0);

	// Patch differs
	expect(compareSemver([1, 0, 2], [1, 0, 1])).toBeGreaterThan(0);
	expect(compareSemver([1, 0, 1], [1, 0, 2])).toBeLessThan(0);

	// 2-element versions (LockVersion)
	expect(compareSemver([6, 0], [6, 0])).toBe(0);
	expect(compareSemver([6, 0], [5, 4])).toBeGreaterThan(0);
	expect(compareSemver([5, 4], [6, 0])).toBeLessThan(0);

	// 2-element: minor differs
	expect(compareSemver([5, 4], [5, 3])).toBeGreaterThan(0);
	expect(compareSemver([5, 3], [5, 4])).toBeLessThan(0);

	// Mixed lengths: 3-element vs 2-element
	expect(compareSemver([5, 4, 1], [5, 4])).toBeGreaterThan(0);
	expect(compareSemver([5, 4], [5, 4, 1])).toBeLessThan(0);
});
