'use strict';
// series 将任务函数和/或组合操作组合成更大的操作，这些操作将按顺序依次执行。
// src 创建一个流，用于从文件系统读取 Vinyl 对象。
// dest http://uprogrammer.cn/gulp-guide-cn/api/dest.html
const { series, src, dest } = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./lib'));
}

function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'));
}

console.log(src('./src/fonts/**').pipe(cssmin()));

exports.build = series(compile, copyfont);
