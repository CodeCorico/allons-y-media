'use strict';

module.exports = [{
  method: 'POST',
  url: 'media',
  controller: function($req, $res, $MediaService) {
    $MediaService.storeUploadedFile($req, function(fileData) {
      $res.send(fileData);
    });
  }
}];

