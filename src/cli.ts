import { ci } from './ci.ts';

try {
	const { status } = ci();
	process.exit(status ?? 1);
} catch (error) {
	// eslint-disable-next-line no-console
	console.error((error as Error).message);
	process.exitCode = 1;
}
