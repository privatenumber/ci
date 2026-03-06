export const parsePnpmVersion = (packageManager?: string) => {
	if (packageManager?.startsWith('pnpm')) {
		return packageManager.slice(4);
	}
};
