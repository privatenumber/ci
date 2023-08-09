import { ci } from './ci.js';

(async () => {
	try {
		const { status } = await ci();
		process.exit(status!);
	} catch (error) {
		console.error((error as Error).message);
		process.exitCode = 1;
	}
})();
