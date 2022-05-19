var existsSync = require('fs').existsSync;
var spawnSync = require('child_process').spawnSync;
var getPnpmVersion = require('./get-pnpm-version');

function spawn(command, args, options) {
	return {
		status: spawnSync(command, args, options).status,
		command: `${command} ${args.join(' ')}`,
	};
}

function main() {
	var opts = {
		stdio: 'inherit',
		shell: true,
	};

	if (existsSync('package-lock.json')) {
		return spawn('npm', ['ci'], opts);
	}
	if (existsSync('yarn.lock')) {
		return spawn('npx', ['yarn', 'install', '--immutable'], opts);
	}
	if (existsSync('pnpm-lock.yaml')) {
		var nodeVersion = process.version
			.slice(1)
			.split('.')
			.map(function (v) {
				return parseInt(v, 10);
			});

		var pnpmVersion = getPnpmVersion(nodeVersion);
		return spawn(
			'npx',
			['pnpm@' + pnpmVersion, 'i', '--frozen-lockfile'],
			opts
		);
	}

	console.error(
		'Error: No lock file (package-lock.json, yarn.lock, pnpm-lock.yaml) found'
	);
	return { status: 1 };
}

module.exports = main;
