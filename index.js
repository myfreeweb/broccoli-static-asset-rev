var Plugin = require('broccoli-plugin')
var RSVP = require('rsvp')
var Async = require('async')
var fs = require('fs')
var path = require('path')
var hash = require('rev-hash')
var readdirp = require('readdirp')

StaticAssetRev.prototype = Object.create(Plugin.prototype)
StaticAssetRev.prototype.constructor = StaticAssetRev
function StaticAssetRev (inputNodes, options) {
	options = options || {}
	options.chokidar = options.chokidar || {}
	Plugin.call(this, inputNodes, {
		annotation: options.annotation
	})
	this.options = options
}

StaticAssetRev.prototype.build = function () {
	var outputPath = this.outputPath
	var options = this.options
	var hashes = { }
	return RSVP.all(this.inputPaths.map(function (inpath) {
		var queue = Async.queue(function (entry, cb) {
			fs.readFile(entry.fullPath, function (err, data) {
				if (!err) {
					hashes[entry.path.replace(/..\/out[^\/]+\//, '')] = hash(data)
					cb()
				}
			})
		}, 1)
		var opts = Object.create(options.chokidar)
		opts.root = inpath
		return new RSVP.Promise(function (resolve, reject) {
			readdirp(opts)
				.on('data', queue.push)
				.on('end', function () {
					queue.drain = resolve
				})
				.on('error', reject)
		})
	})).then(function () {
		fs.writeFileSync(path.join(outputPath, 'assets.json'), JSON.stringify(hashes));
	})
}

module.exports = StaticAssetRev
