var Plugin = require('broccoli-plugin')
var RSVP = require('rsvp')
var fs = require('fs')
var es = require('event-stream')
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
		return new RSVP.Promise(function (resolve, reject) {
			options.chokidar.root = inpath
			readdirp(options.chokidar)
				.on('data', function (entry) {
					fs.readFile(entry.fullPath, function (err, data) {
						if (!err) {
							hashes[entry.path.replace(/..\/out[^\/]+\//, '')] = hash(data)
						}
					})
				})
				.on('end', function () {
					fs.writeFileSync(path.join(outputPath, 'assets.json'), JSON.stringify(hashes));
					resolve(null)
				})
		})
	}))
}

module.exports = StaticAssetRev
