import { testSuite, expect } from 'manten';
import { guessPnpmVersion } from '../src/utils/guess-pnpm-version.js';

export default testSuite(({ test }) => {
	test('getPnpmVersion', () => {
		expect(guessPnpmVersion([18, 0, 0])).toBe('@8');
		expect(guessPnpmVersion([16, 14, 0])).toBe('@8');

		expect(guessPnpmVersion([14, 19, 0])).toBe('@7');

		expect(guessPnpmVersion([14, 18, 0])).toBe('@6');
		expect(guessPnpmVersion([12, 17, 0])).toBe('@6');

		expect(guessPnpmVersion([12, 16, 0])).toBe('@5');
	});
});
