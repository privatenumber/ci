import { ci } from './ci.js';

try {
	process.exit(ci().status);
} catch (error) {
	console.error(error.message);
	process.exit(1);
}
