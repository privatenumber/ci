#!/usr/bin/env node

'use strict';

var existsSync = require('fs').existsSync;
var spawnSync = require('child_process').spawnSync;
var opts = {
	stdio: 'inherit',
	shell: true,
};

if (existsSync('package-lock.json')) {
	spawnSync('npm', ['ci'], opts);
} else if (existsSync('yarn.lock')) {
	spawnSync('npx', ['yarn', 'install', '--immutable'], opts);
} else if (existsSync('pnpm-lock.yaml')) {
	spawnSync('npx', ['pnpm', 'i', '--frozen-lockfile'], opts);
} else {
	console.error('Error: No lock file (package-lock.json, yarn.lock, pnpm-lock.yaml) found');
	process.exit(1);
}
