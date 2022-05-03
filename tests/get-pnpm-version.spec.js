const assert = require('assert');
const getPnpmVersion = require('../lib/get-pnpm-version');

assert(getPnpmVersion([14, 19, 0]) === 'latest');

assert(getPnpmVersion([14, 18, 0]) === '6');

assert(getPnpmVersion([12, 17, 0]) === '6');

assert(getPnpmVersion([12, 16, 0]) === '5');
