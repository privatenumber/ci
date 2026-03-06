import { test, expect } from 'manten';
import { guessPnpmVersion } from '../src/utils/guess-pnpm-version.ts';

test('getPnpmVersion', () => {
	// pnpm 10 — Node >=18.12, lock 9.0
	expect(guessPnpmVersion([18, 12, 0])).toBe('@10');
	expect(guessPnpmVersion([20, 0, 0])).toBe('@10');

	// pnpm 10 with lockfile version
	expect(guessPnpmVersion([18, 12, 0], [9, 0])).toBe('@10');

	// pnpm 9 — same constraints as 10, but lockfile 9.0 matches 10 first
	// pnpm 9 is only reachable via packageManager field

	// pnpm 8 — Node >=16.14, lock 6.0
	expect(guessPnpmVersion([16, 14, 0])).toBe('@8');
	expect(guessPnpmVersion([16, 14, 0], [6, 0])).toBe('@8');

	// pnpm 7 — Node >=14.19, lock 5.4
	expect(guessPnpmVersion([14, 19, 0])).toBe('@7');

	// pnpm 6 — Node >=12.17, lock 5.3
	expect(guessPnpmVersion([14, 18, 0])).toBe('@6');
	expect(guessPnpmVersion([12, 17, 0])).toBe('@6');

	// pnpm 5 — Node >=10.13, lock 5.1
	expect(guessPnpmVersion([12, 16, 0])).toBe('@5');
});
