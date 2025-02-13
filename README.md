# per-env

> Clean up your `package.json` with per-`NODE_ENV` npm scripts.

[![travis build](https://img.shields.io/travis/ericclemmons/per-env.svg)](https://travis-ci.org/ericclemmons/per-env)
[![version](https://img.shields.io/npm/v/per-env.svg)](http://npm.im/per-env)
[![downloads](https://img.shields.io/npm/dm/per-env.svg)](http://npm-stat.com/charts.html?package=per-env)
[![MIT License](https://img.shields.io/npm/l/per-env.svg)](http://opensource.org/licenses/MIT)


### Features

- [x] Call npm stages based on `NODE_ENV` (defaults to `development`)

### Changes from 1.x

- [x] **BREAKING** Dropped support for per-env environment variables in package.json.<br>This change was made to simplify the implementation and to avoid potential conflicts with other packages that set environment variables (dot-env, etc.).
- [x] Added support for different script runners (bun, yarn, etc).<br>Previously all scripts were run with npm, regardless of the runner used to run per-env.
- [x] Added tests.
### Example

```js
{
  "scripts": {
    // If NODE_ENV is missing, defaults to "development".
    "build": "per-env",

    "build:development": "webpack -d --watch",
    "build:staging": "webpack -p",
    "build:production": "webpack -p",

    // Deployment won't work unless NODE_ENV=production is explicitly set.
    "deploy": "per-env",

    "predeploy:production": "docker build -t ${DOCKER_USER}/${DOCKER_PROJECT} .",
    "deploy:production": "docker push ${DOCKER_USER}/${DOCKER_PROJECT}",

    // "npm start" is _the_ command to start the server across all environments.
    "start": "per-env",

    "start:development": "npm run build:development",

    "prestart:production": "npm run build",
    "start:production": "start-cluster build/server/server.js",

    "prestart:staging": "npm run build",
    "start:staging": "start-cluster build/server/server.js",
  }
}
```


### Installation

```shell
$ npm install --save per-env
```


### License

> MIT License 2016 © Eric Clemmons
