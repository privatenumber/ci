import path from 'path';
import { describe, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { execa } from 'execa';

const ciBinaryPath = path.resolve('dist/cli.js');
const ci = (cwd: string) => execa(ciBinaryPath, [], { cwd });

describe('ci', ({ describe, runTestSuite }) => {
	describe('lock file', ({ test }) => {
		test('npm', async ({ onTestFinish }) => {
			const fixture = await createFixture('tests/fixtures/npm');
			onTestFinish(async () => await fixture.rm());

			const { stdout } = await ci(fixture.path);
			expect(stdout).toMatch('added 1 package, and audited 2 packages');
		});

		test('pnpm', async ({ onTestFinish }) => {
			const fixture = await createFixture('tests/fixtures/pnpm');
			onTestFinish(async () => await fixture.rm());

			const { stdout } = await ci(fixture.path);

			// pnpm changed "Lockfile is up-to-date" to "Lockfile is up to date"
			expect(stdout).toMatch('Lockfile is up');
		});

		test('yarn', async ({ onTestFinish }) => {
			const fixture = await createFixture('tests/fixtures/yarn');
			onTestFinish(async () => await fixture.rm());

			const { stdout } = await ci(fixture.path);
			expect(stdout).toMatch('YN0000: Done in');
		});
	});

	runTestSuite(import('./get-pnpm-version.spec.js'));
});
