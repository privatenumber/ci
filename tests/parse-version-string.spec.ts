import { test, expect } from 'manten';
import { parseVersionString } from '../src/utils/parse-version-string.ts';

test('parseVersionString', () => {
	expect(parseVersionString('1.2.3')).toEqual([1, 2, 3]);
	expect(parseVersionString('16.14.0')).toEqual([16, 14, 0]);
	expect(parseVersionString('5.4')).toEqual([5, 4]);
	expect(parseVersionString('6.0')).toEqual([6, 0]);
});
