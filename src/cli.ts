import { ci } from './ci';

try {
	process.exit(ci().status!);
} catch (error) {
	console.error((error as any).message);
	process.exit(1);
}
