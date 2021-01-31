# ci [![Latest version](https://badgen.net/npm/v/ci)](https://npm.im/ci) [![Monthly downloads](https://badgen.net/npm/dm/ci)](https://npm.im/ci) [![Install size](https://packagephobia.now.sh/badge?p=ci)](https://packagephobia.now.sh/result?p=ci)

Install dependencies from lock using the appropriate Node version manager ([npm](https://www.npmjs.com), [yarn](https://yarnpkg.com), [pnpm](https://pnpm.js.org/)).

👉 Run it in your npm project directory:

```sh
npx ci
```

<sub>If you like this project, please star it & [follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## 🙋‍♂️ Why?

So you no longer have to check or remember which projects are using which package manager. Just type in `npx ci` and it will do the work for you!

Great for:
- Installing dependencies in a 3rd-party project that's using a different package manager
- CI workflows that are agnostic to project & package manager
- Accidentally typing in `npx ci` instead of `npm ci`. Except now it's even smarter 😄
