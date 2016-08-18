module.exports = function() {
  'use strict';

  DependencyInjection.service('$MediaService', function() {

    return new (function $MediaService() {

      require('events-manager').EventsManager.call(this);

      var MEDIA_URL = '/media',

          Busboy = require('busboy'),
          extend = require('extend'),
          fs = require('fs-extra'),
          path = require('path'),
          uuid = require('node-uuid'),
          _this = this,
          _mediaFolder = path.resolve('media');

      this.storeUploadedFile = function($req, callback) {
        var url = MEDIA_URL + '/',
            name = '',
            busboy = new Busboy({
              headers: $req.headers
            }),
            fields = {};

        busboy.on('field', function(fieldname, value) {
          fields[fieldname] = value;
        });

        busboy.on('file', function(fieldname, file, filename) {
          var ext = filename.split('.').pop(),
              newFilename = uuid.v1() + '.' + ext;

          url += newFilename;

          name = filename.split('.');
          name.pop();
          name = name.join('.');

          fields.fileName = newFilename;
          fields.fileUrl = '/media/' + newFilename;
          fields.filePath = path.join(_mediaFolder, newFilename);

          file.pipe(fs.createWriteStream(fields.filePath));
        });

        busboy.on('finish', function() {
          _this.fire('finish', fields, function(results) {
            var result = {
              url: url,
              name: name
            };

            if (results && results.length) {
              for (var i = 0; i < results.length; i++) {
                extend(true, result, results[i]);
              }
            }

            callback(result);
          });
        });

        $req.pipe(busboy);
      };

    })();

  });

};