import { ci } from './ci.ts';

(async () => {
	try {
		const { status } = await ci();
		process.exit(status!);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error((error as Error).message);
		process.exitCode = 1;
	}
})();
