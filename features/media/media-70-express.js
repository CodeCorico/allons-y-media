'use strict';

module.exports = function($server) {
  var path = require('path'),
      fs = require('fs-extra'),
      mediaFolder = path.resolve('media');

  require(path.resolve(__dirname, 'models/media-service-back.js'))();

  fs.ensureDirSync(path.resolve('media'));

  function _sendFile(req, res, filename) {
    if (fs.existsSync(filename)) {
      res.sendFile(filename);
    }
    else {
      res
        .status(404)
        .json({
          error: 'File not found'
        });
    }
  }

  $server.use('/media', function(req, res) {
    _sendFile(req, res, path.join(mediaFolder, decodeURI(req.path)));
  });
};
