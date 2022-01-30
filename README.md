# npx ci [![Latest version](https://badgen.net/npm/v/ci)](https://npm.im/ci)

Package-manager agonstic `npm ci`. Supports [npm](https://docs.npmjs.com/cli/v7/commands/npm), [yarn](https://yarnpkg.com/) and [pnpm](https://pnpm.io/).

It's tiny, has zero dependencies, and blazing fast!

<sub>If you like this project, please star it & [follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## Usage

Run in your project in-place of [`npm ci`](https://docs.npmjs.com/cli/v7/commands/npm-ci):
```sh
npx ci
```

## Why?

npm has a [`npm ci`](https://docs.npmjs.com/cli/v7/commands/npm-ci) command to install dependencies from the _lock file_ with a clean slate. However, this command is different across package managers like [yarn](https://yarnpkg.com/) and [pnpm](https://pnpm.io/), and can be confusing to remember when switching between projects.

`npx ci` is a package-manager agnostic `npm ci`. You can run this in any project without worrying about the whether the project uses npm, yarn, or pnpm. It's great for contributing to new projects or using it in CI workflows.

Also _safer_ for when you accidentally type `npx ci` instead of `npm ci` 😉 
