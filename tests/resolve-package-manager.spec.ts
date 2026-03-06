import { describe, test, expect } from 'manten';
import { resolvePackageManager } from '../src/resolve-package-manager.ts';

describe('resolvePackageManager', () => {
	test('npm when package-lock.json exists', () => {
		const result = resolvePackageManager({
			lockFiles: ['package-lock.json'],
			nodeVersion: [18, 0, 0],
		});
		expect(result).toEqual({
			command: 'npm',
			args: ['ci'],
		});
	});

	test('yarn when yarn.lock exists', () => {
		const result = resolvePackageManager({
			lockFiles: ['yarn.lock'],
			nodeVersion: [18, 0, 0],
		});
		expect(result).toEqual({
			command: 'npx',
			args: ['yarn', '--immutable'],
		});
	});

	test('pnpm when pnpm-lock.yaml exists, with packageManager', () => {
		const result = resolvePackageManager({
			lockFiles: ['pnpm-lock.yaml'],
			nodeVersion: [18, 0, 0],
			packageManager: 'pnpm@8.0.0',
		});
		expect(result).toEqual({
			command: 'npx',
			args: ['pnpm@8.0.0', 'i', '--frozen-lockfile'],
		});
	});

	test('pnpm guesses version from node and lockfile version', () => {
		const result = resolvePackageManager({
			lockFiles: ['pnpm-lock.yaml'],
			nodeVersion: [16, 14, 0],
			lockFirstLine: 'lockfileVersion: 5.4',
		});
		// Node 16.14+ with lock 5.4 → pnpm 7
		expect(result).toEqual({
			command: 'npx',
			args: ['pnpm@7', 'i', '--frozen-lockfile'],
		});
	});

	test('pnpm falls back to unversioned when no match', () => {
		const result = resolvePackageManager({
			lockFiles: ['pnpm-lock.yaml'],
			nodeVersion: [18, 0, 0],
			lockFirstLine: "lockfileVersion: '99.0'",
		});
		expect(result).toEqual({
			command: 'npx',
			args: ['pnpm', 'i', '--frozen-lockfile'],
		});
	});

	test('npm takes priority over yarn and pnpm', () => {
		const result = resolvePackageManager({
			lockFiles: ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'],
			nodeVersion: [18, 0, 0],
		});
		expect(result).toEqual({
			command: 'npm',
			args: ['ci'],
		});
	});

	test('yarn takes priority over pnpm', () => {
		const result = resolvePackageManager({
			lockFiles: ['yarn.lock', 'pnpm-lock.yaml'],
			nodeVersion: [18, 0, 0],
		});
		expect(result).toEqual({
			command: 'npx',
			args: ['yarn', '--immutable'],
		});
	});

	test('throws when no lock file', () => {
		expect(() => resolvePackageManager({
			lockFiles: [],
			nodeVersion: [18, 0, 0],
		})).toThrow('No lock file');
	});

	test('packageManager is ignored for non-pnpm lock files', () => {
		const result = resolvePackageManager({
			lockFiles: ['package-lock.json'],
			nodeVersion: [18, 0, 0],
			packageManager: 'pnpm@8.0.0',
		});
		expect(result).toEqual({
			command: 'npm',
			args: ['ci'],
		});
	});
});
