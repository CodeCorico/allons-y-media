'use strict';

var path = require('path');
require(path.resolve(__dirname, '../models/media-service-back.js'))();

module.exports = [{
  method: 'POST',
  url: 'media',
  controller: function($req, $res, $MediaService) {
    $MediaService.storeUploadedFile($req, function(fileData) {
      $res.send(fileData);
    });
  }
}];

