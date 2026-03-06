import path from 'node:path';
import {
	describe, test, expect, onTestFinish,
} from 'manten';
import { createFixture } from 'fs-fixture';
import { execa } from 'execa';

const ciBinaryPath = path.resolve('dist/cli.js');
const ci = (cwd: string) => execa(ciBinaryPath, [], { cwd });

describe('ci', () => {
	describe('lock file', () => {
		test('npm', async () => {
			const fixture = await createFixture('tests/fixtures/npm');
			onTestFinish(async () => await fixture.rm());

			const { stdout } = await ci(fixture.path);
			expect(stdout).toMatch('added 1 package, and audited 2 packages');
		});

		test('yarn', async () => {
			const fixture = await createFixture('tests/fixtures/yarn');
			onTestFinish(async () => await fixture.rm());

			const { stdout } = await ci(fixture.path);
			expect(stdout).toMatch('YN0000: Done in');
		});

		describe('pnpm', () => {
			test('detect veresion', async () => {
				const fixture = await createFixture('tests/fixtures/pnpm');
				onTestFinish(async () => await fixture.rm());

				const { stdout } = await ci(fixture.path);

				// pnpm changed "Lockfile is up-to-date" to "Lockfile is up to date"
				expect(stdout).toMatch('Lockfile is up');
			});

			test('packageManager', async () => {
				const fixture = await createFixture('tests/fixtures/pnpm-package-manager');
				onTestFinish(async () => await fixture.rm());

				const { stdout } = await ci(fixture.path);

				// pnpm changed "Lockfile is up-to-date" to "Lockfile is up to date"
				expect(stdout).toMatch('Lockfile is up');
			});
		});
	});

	import('./get-pnpm-version.spec.ts');
	import('./compare-semver.spec.ts');
	import('./parse-version-string.spec.ts');
	import('./detect-pnpm-version.spec.ts');
	import('./parse-lock-version.spec.ts');
	import('./resolve-package-manager.spec.ts');
});
