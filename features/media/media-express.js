'use strict';

module.exports = function($server) {
  var path = require('path'),
      fs = require('fs-extra'),
      mediaFolder = path.resolve('media');

  fs.ensureDirSync(path.resolve('media'));

  function _sendFile(req, res, filename) {
    var sendFile = false;

    if (fs.existsSync(filename)) {
      res.sendFile(filename);
      sendFile = filename;
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
    _sendFile(req, res, path.join(mediaFolder, req.path));
  });
};
