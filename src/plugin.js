'use strict';

var fs = require('fs');
var each = require('async').each;
if (!Object.assign) Object.assign = require('object-assign');

function config(params) {
  var options = {
    destination: null,
    force: false
  };

  if ('object' == typeof params) Object.assign(options, params);
  if ('string' == typeof params) Object.assign(options, { destination: params });

  return options;
}

function plugin(params) {
  var options = config(params);

  return function (files, metalsmith, done) {
    if (options.force) return done();

    var dst = options.destination || metalsmith.destination();

    each(
      Object.keys(files),
      function (file, done) {
        var max_ctime = new Date().getTime();
        var src_ctime = max_ctime;
        var dst_ctime = 0;

        if (files[file].stats) {
          src_ctime = files[file].stats.ctime.getTime();
        }

        var dst_file = metalsmith.path(dst, file);

        fs.stat(dst_file, function (err, stats) {
          if (!err) dst_ctime = stats.ctime.getTime();

          if (dst_ctime > src_ctime) {
            delete files[file];
          }

          done();
        });
      },
      function (err) {
        if (err) done(err);
        done();
      }
    );
  };
}

module.exports = plugin;
