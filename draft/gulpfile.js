const { watch } = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');

function startNodemon() {
    nodemon({
      script: 'server.js',
      ext: 'js',
      ignore: 'node_modules',
      env: {'NODE_ENV': 'development' },
    })
  }

function browserReload(cb) {
  browserSync.reload()
  cb();
}

exports.default = () => {
  browserSync.init({
    proxy: 'http://localhost:5000'
  })
  watch(['views/*.ejs', 'public/css/*.css'], browserReload)
  startNodemon();
}