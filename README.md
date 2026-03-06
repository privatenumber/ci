# npx ci [![Latest version](https://badgen.net/npm/v/ci)](https://npm.im/ci) [![npm downloads](https://badgen.net/npm/dm/ci)](https://npm.im/ci)

A safer [`npm ci`](https://docs.npmjs.com/cli/v8/commands/npm-ci).

Run it in any npm project to install dependencies from lock using the appropriate package-manager (supports [npm](https://docs.npmjs.com/cli/v7/commands/npm), [yarn](https://yarnpkg.com/) and [pnpm](https://pnpm.io/)).

<br>

<p align="center">
	<a href="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=platinum">
		<picture>
			<source width="830" media="(prefers-color-scheme: dark)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=platinum&image=dark">
			<source width="830" media="(prefers-color-scheme: light)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=platinum&image">
			<img width="830" src="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=platinum&image" alt="Premium sponsor banner">
		</picture>
	</a>
</p>

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

	If yarn or pnpm isn't already installed, `npx ci` installs the appropriate version for you. When [`packageManager`](https://nodejs.org/api/packages.html#packagemanager) is set, it uses the locally available pnpm directly (compatible with corepack).

	It's great for using it in CI/CD workflows!
	

- **Typo proof**

	When you accidentally type _npx_ when typing in `npm ci`, your dependencies still get installed.
	
	It's actually the _safer_ option too!

<br>

<p align="center">
	<a href="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=gold">
		<picture>
			<source width="830" media="(prefers-color-scheme: dark)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=gold&image=dark">
			<source width="830" media="(prefers-color-scheme: light)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=gold&image">
			<img width="830" src="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=gold&image" alt="Premium sponsor banner">
		</picture>
	</a>
</p>

## FAQ

### Can it detect the package manager without a lock file?

A lock file is required — `npx ci` is strictly an alternative to `npm ci`, so a _clean_/_immutable_/_frozen_ install needs a lock file.

The lock file determines which package manager to use. If [`packageManager`](https://nodejs.org/api/packages.html#packagemanager) is set in `package.json`, pnpm is run directly (works with corepack). Otherwise, the pnpm version is guessed from the Node.js version and lockfile version.

## Related

- [`npx link`](https://github.com/privatenumber/link) - A safer `npm link`.

## Sponsors

<p align="center">
	<a href="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver1">
		<picture>
			<source width="410" media="(prefers-color-scheme: dark)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver1&image=dark">
			<source width="410" media="(prefers-color-scheme: light)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver1&image">
			<img width="410" src="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver1&image" alt="Premium sponsor banner">
		</picture>
	</a>
	<a href="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver2">
		<picture>
			<source width="410" media="(prefers-color-scheme: dark)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver2&image=dark">
			<source width="410" media="(prefers-color-scheme: light)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver2&image">
			<img width="410" src="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver2&image" alt="Premium sponsor banner">
		</picture>
	</a>
</p>

<p align="center">
	<a href="https://github.com/sponsors/privatenumber">
		<img src="https://cdn.jsdelivr.net/gh/privatenumber/sponsors/sponsorkit/sponsors.svg">
	</a>
</p>
