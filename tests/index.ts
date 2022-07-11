import path from 'path';
import { describe, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { execa } from 'execa';

const ciBinaryPath = path.resolve('dist/cli.js');
const ci = (cwd: string) => execa(ciBinaryPath, [], { cwd });

describe('ci', ({ describe }) => {
	describe('lock file', ({ test }) => {
		test('npm', async () => {
			const fixture = await createFixture('tests/fixtures/npm');

			const { stdout } = await ci(fixture.path);
			expect(stdout).toMatch('added 1 package, and audited 2 packages');

			await fixture.rm();
		});

		test('pnpm', async () => {
			const fixture = await createFixture('tests/fixtures/pnpm');

			const { stdout } = await ci(fixture.path);
			expect(stdout).toMatch('Lockfile is up-to-date, resolution step is skipped');

			await fixture.rm();
		});

		test('yarn', async () => {
			const fixture = await createFixture('tests/fixtures/yarn');

			const { stdout } = await ci(fixture.path);
			expect(stdout).toMatch('➤ YN0000: Done in');

			await fixture.rm();
		});
	});
});
