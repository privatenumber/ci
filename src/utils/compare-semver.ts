export const compareSemver = (
	semverA: number[],
	semverB: number[],
) => {
	const length = Math.max(semverA.length, semverB.length);
	for (let i = 0; i < length; i += 1) {
		const diff = (semverA[i] ?? 0) - (semverB[i] ?? 0);
		if (diff !== 0) {
			return diff;
		}
	}
	return 0;
};
