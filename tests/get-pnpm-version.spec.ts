import { testSuite, expect } from 'manten';
import { getPnpmVersion } from '../src/get-pnpm-version.js';

export default testSuite(({ test }) => {
	test('getPnpmVersion', () => {
		expect(getPnpmVersion([18, 0, 0])).toBe('@8');
		expect(getPnpmVersion([16, 14, 0])).toBe('@8');

		expect(getPnpmVersion([14, 19, 0])).toBe('@7');

		expect(getPnpmVersion([14, 18, 0])).toBe('@6');
		expect(getPnpmVersion([12, 17, 0])).toBe('@6');

		expect(getPnpmVersion([12, 16, 0])).toBe('@5');
	});
});
