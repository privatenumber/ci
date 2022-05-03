# npx ci [![Latest version](https://badgen.net/npm/v/ci)](https://npm.im/ci)

A safer [`npm ci`](https://docs.npmjs.com/cli/v8/commands/npm-ci).

Run it in any npm project to install dependencies from lock using the appropriate package-manager (supports [npm](https://docs.npmjs.com/cli/v7/commands/npm), [yarn](https://yarnpkg.com/) and [pnpm](https://pnpm.io/)).

<sub>If you like this project, please star it & [follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## Usage

Use in your npm project instead of [`npm ci`](https://docs.npmjs.com/cli/v8/commands/npm-ci):
```sh
npx ci
```

## Why?

npm has a [`npm ci`](https://docs.npmjs.com/cli/v8/commands/npm-ci) command to install dependencies from the lock file (eg. `package-lock.json`), ensuring all project contributors have the same dependencies.

This command is different across 3rd-party package-managers like [yarn](https://yarnpkg.com/) and [pnpm](https://pnpm.io/), and can be confusing to remember when switching between projects.


This is where `npx ci` comes in:

- **Package-manager agnostic**

	`npx ci` is a package-manager agnostic `npm ci`. You can run this in any project and dependencies will be installed appropriately.
	
	It's great for contributing to new projects!

- **Can use in any environment with a single command**

	If yarn or pnpm isn't already installed, `npx ci` installs it for you.
	
	It's great for using it in CI/CD workflows!
	

- **Typo proof**

	When you accidentally type _npx_ when typing in `npm ci`, your dependencies still get installed.
	
	It's actually the _safer_ option too!


## Related

- [`npx link`](https://github.com/privatenumber/link) - A safer `npm link`.
