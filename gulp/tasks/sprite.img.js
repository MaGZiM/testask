'use strict';
var merge = require('merge-stream'),
    buffer = require('vinyl-buffer');

module.exports = function () {
  $.gulp.task('sprite:img', function () {
    var spriteData = $.gulp.src('./source/sprites/*{.png,.gif}')
      .pipe($.gp.spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        cssFormat: 'css',
        padding: 15
      }));

    var imgStream = spriteData.img
      .pipe(buffer())
      .pipe($.gp.imagemin())
      .pipe($.gulp.dest($.config.root + '/assets/img/sprites'));

    var cssStream =  spriteData.css.pipe($.gulp.dest('./source/style/sprites'));

    return merge(imgStream, cssStream);
  });
};
