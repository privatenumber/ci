export const compareSemver = <Version extends number[]>(
	semverA: Version,
	semverB: Version,
) => (
		semverA[0] - semverB[0]
	|| semverA[1] - semverB[1]
	|| semverA[2] - semverB[2]
	|| 0
	);
