# ci [![Latest version](https://badgen.net/npm/v/ci)](https://npm.im/ci) [![Monthly downloads](https://badgen.net/npm/dm/ci)](https://npm.im/ci) [![Install size](https://packagephobia.now.sh/badge?p=ci)](https://packagephobia.now.sh/result?p=ci)

Package-manager agonstic lock-file installation. Supports [npm](https://docs.npmjs.com/cli/v7/commands/npm), [yarn](https://yarnpkg.com/) and [pnpm](https://pnpm.io/).

Try it out in your npm project. It has zero dependencies and is blazing fast!

```sh
$ npx ci
```

<sub>If you like this project, please star it & [follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## 🙋‍♂️ Why?

npm has a command [`npm ci`](https://docs.npmjs.com/cli/v7/commands/npm-ci) to install dependencies from the _lock file_ with a clean slate. However, this command is different on both [yarn](https://yarnpkg.com/) and [pnpm](https://pnpm.io/) and can be confusing to remember across different projects.

You can now run this in any project without worrying about the package manager. It's great for contributing to open-source projects or using it in CI workflows.

Also safe for when you accidentally type `npx ci` instead of `npm ci` 😉 
