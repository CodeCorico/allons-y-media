'use strict';

module.exports = function($allonsy, $task, $done) {
  if (process.env.MEDIA_BACKUP && process.env.MEDIA_BACKUP == 'false') {
    return $done();
  }

  var path = require('path');

  require(path.resolve(__dirname, 'models/media-service-back.js'))();

  var $MediaService = DependencyInjection.injector.controller.get('$MediaService');

  $task(function($backupPath, $addDestination, $done) {
    $MediaService.backup($backupPath, $addDestination, $done);
  });

  $done();
};
