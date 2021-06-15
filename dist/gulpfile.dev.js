"use strict";

var preprocessor = 'sass',
    // Preprocessor (sass, less, styl); 'sass' also work with the Scss syntax in blocks/ folder.
fileswatch = 'html,htm,txt,json,md,woff2'; // List of files extensions for watching & hard reload

var _require = require('gulp'),
    src = _require.src,
    dest = _require.dest,
    parallel = _require.parallel,
    series = _require.series,
    watch = _require.watch;

var browserSync = require('browser-sync').create();

var bssi = require('browsersync-ssi');

var ssi = require('ssi');

var webpack = require('webpack-stream');

var sass = require('gulp-sass');

var sassglob = require('gulp-sass-glob');

var less = require('gulp-less');

var lessglob = require('gulp-less-glob');

var styl = require('gulp-stylus');

var stylglob = require("gulp-noop");

var cleancss = require('gulp-clean-css');

var autoprefixer = require('gulp-autoprefixer');

var rename = require('gulp-rename');

var imagemin = require('gulp-imagemin');

var newer = require('gulp-newer');

var rsync = require('gulp-rsync');

var del = require('del');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/',
      middleware: bssi({
        baseDir: 'app/',
        ext: '.html'
      })
    },
    ghostMode: {
      clicks: false
    },
    notify: false,
    online: true // tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt

  });
}

function scripts() {
  return src(['app/js/*.js', '!app/js/*.min.js']).pipe(webpack({
    mode: 'production',
    performance: {
      hints: false
    },
    module: {
      rules: [{
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/env'],
          plugins: ['babel-plugin-root-import']
        }
      }]
    }
  })).on('error', function handleError() {
    this.emit('end');
  }).pipe(rename('app.min.js')).pipe(dest('app/js')).pipe(browserSync.stream());
}

function styles() {
  return src(["app/styles/".concat(preprocessor, "/*.*"), "!app/styles/".concat(preprocessor, "/_*.*")]).pipe(eval("".concat(preprocessor, "glob"))()).pipe(eval(preprocessor)()).pipe(autoprefixer({
    overrideBrowserslist: ['last 10 versions'],
    grid: true
  })).pipe(cleancss({
    level: {
      1: {
        specialComments: 0
      }
    }
    /* format: 'beautify' */

  })).pipe(rename({
    suffix: ".min"
  })).pipe(dest('app/css')).pipe(browserSync.stream());
}

function images() {
  return src(['app/images/src/**/*']).pipe(newer('app/images/dist')).pipe(imagemin()).pipe(dest('app/images/dist')).pipe(browserSync.stream());
}

function buildcopy() {
  return src(['{app/js,app/css}/*.min.*', 'app/images/**/*.*', '!app/images/src/**/*', 'app/fonts/**/*'], {
    base: 'app/'
  }).pipe(dest('dist'));
}

function buildhtml() {
  var includes;
  return regeneratorRuntime.async(function buildhtml$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          includes = new ssi('app/', 'dist/', '/**/*.html');
          includes.compile();
          del('dist/parts', {
            force: true
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

function cleandist() {
  return del('dist/**/*', {
    force: true
  });
}

function deploy() {
  return src('dist/').pipe(rsync({
    root: 'dist/',
    hostname: 'username@yousite.com',
    destination: 'yousite/public_html/',
    // clean: true, // Mirror copy with file deletion
    include: [
      /* '*.htaccess' */
    ],
    // Included files to deploy,
    exclude: ['**/Thumbs.db', '**/*.DS_Store'],
    recursive: true,
    archive: true,
    silent: false,
    compress: true
  }));
}

function startwatch() {
  watch("app/styles/".concat(preprocessor, "/**/*"), {
    usePolling: true
  }, styles);
  watch(['app/js/**/*.js', '!app/js/**/*.min.js'], {
    usePolling: true
  }, scripts);
  watch('app/images/src/**/*.{jpg,jpeg,png,webp,svg,gif}', {
    usePolling: true
  }, images);
  watch("app/**/*.{".concat(fileswatch, "}"), {
    usePolling: true
  }).on('change', browserSync.reload);
}

exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.deploy = deploy;
exports.assets = series(scripts, styles, images);
exports.build = series(cleandist, scripts, styles, images, buildcopy, buildhtml);
exports["default"] = series(scripts, styles, images, parallel(browsersync, startwatch));