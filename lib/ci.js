#!/usr/bin/env node

'use strict';

var existsSync = require('fs').existsSync;
var spawnSync = require('child_process').spawnSync;
var getPnpmVersion = require('./get-pnpm-version');

var opts = {
	stdio: 'inherit',
	shell: true,
};

var spawned;

if (existsSync('package-lock.json')) {
	spawned = spawnSync('npm', ['ci'], opts);
} else if (existsSync('yarn.lock')) {
	spawned = spawnSync('npx', ['yarn', 'install', '--immutable'], opts);
} else if (existsSync('pnpm-lock.yaml')) {
	var nodeVersion = process.version.slice(1).split('.').map(function (v) {
		return parseInt(v, 10);
	});
	
	var pnpmVersion = getPnpmVersion(nodeVersion);
	spawned = spawnSync('npx', ['pnpm@' + pnpmVersion, 'i', '--frozen-lockfile'], opts);
} else {
	console.error('Error: No lock file (package-lock.json, yarn.lock, pnpm-lock.yaml) found');
	process.exit(1);
}

process.exit(spawned.status);
