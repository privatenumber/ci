#!/usr/bin/env node

'use strict';

var existsSync = require('fs').existsSync;
var spawnSync = require('child_process').spawnSync;
var opts = {
	stdio: 'inherit',
	shell: true,
};

var parseNodeVersion = process.version.match(/^v(\d+)\.(\d+)\.(\d+)/);
var nodeVersion = parseNodeVersion.slice(1, 4).map(v => parseInt(v, 10));
function compareSemver(semverA, semverB) {
	return (
		semverA[0] - semverB[0]
		|| semverA[1] - semverB[1]
		|| semverA[2] - semverB[2]
	);
}

if (existsSync('package-lock.json')) {
	spawnSync('npm', ['ci'], opts);
} else if (existsSync('yarn.lock')) {
	spawnSync('npx', ['yarn', 'install', '--immutable'], opts);
} else if (existsSync('pnpm-lock.yaml')) {
	// https://github.com/pnpm/pnpm/releases/tag/v6.0.0-rc.1
	var pnpmVersion = compareSemver(nodeVersion, [12, 17, 0]) >= 0 ? 'pnpm@6' : 'pnpm@5';
	spawnSync('npx', [pnpmVersion, 'i', '--frozen-lockfile'], opts);
} else {
	console.error('Error: No lock file (package-lock.json, yarn.lock, pnpm-lock.yaml) found');
	process.exit(1);
}
