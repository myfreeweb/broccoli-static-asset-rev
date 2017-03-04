# broccoli-static-asset-rev [![npm version](https://img.shields.io/npm/v/broccoli-static-asset-rev.svg?style=flat)](https://www.npmjs.org/package/broccoli-static-asset-rev) [![npm downloads](https://img.shields.io/npm/dm/broccoli-static-asset-rev.svg?style=flat)](https://www.npmjs.org/package/broccoli-static-asset-rev) [![Dependency Status](https://img.shields.io/gemnasium/myfreeweb/broccoli-static-asset-rev.svg?style=flat)](https://gemnasium.com/myfreeweb/broccoli-static-asset-rev) [![Unlicense](https://img.shields.io/badge/un-license-green.svg?style=flat)](http://unlicense.org)

A module that provides broccoli-statically (:D) updated file hashes for cache busting, using [readdirp].

Related: [dynamic-asset-rev](https://github.com/myfreeweb/dynamic-asset-rev).

[readdirp]: https://github.com/thlorenz/readdirp

## Installation

```bash
$ npm install --save broccoli-static-asset-rev
```

## Usage

```js
const AssetRev = require('broccoli-static-asset-rev')

const rev = new AssetRev(someNode) // Will be a tree with assets.json containing the hashes
```

## Contributing

Please feel free to submit pull requests!

By participating in this project you agree to follow the [Contributor Code of Conduct](http://contributor-covenant.org/version/1/4/).

## License

This is free and unencumbered software released into the public domain.  
For more information, please refer to the `UNLICENSE` file or [unlicense.org](http://unlicense.org).
