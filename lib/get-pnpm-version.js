function compareSemver(semverA, semverB) {
	return (
		semverA[0] - semverB[0]
		|| semverA[1] - semverB[1]
		|| semverA[2] - semverB[2]
	);
}

function getPnpmVersion(nodeVersion) {
	// pnpm v7 requires Node v14.19 and up: https://github.com/pnpm/pnpm/blob/v7.0.0/packages/types/package.json#L8
	if (compareSemver(nodeVersion, [14, 19, 0]) >= 0) {
		return 'latest';
	}

	// pnpm v6 requires Node v12.17 and up: https://github.com/pnpm/pnpm/releases/tag/v6.0.0
	if (compareSemver(nodeVersion, [12, 17, 0]) >= 0) {
		return '6';
	}

	return '5';
}

module.exports = getPnpmVersion;
