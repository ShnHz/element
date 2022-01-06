/*
 * @Author: sanghangning
 * @Date: 2022-01-05 18:17:56
 * @Last Modified by: sanghangning
 * @Last Modified time: 2022-01-05 18:18:31
 * 该文件作用是将packages/theme-chalk/src/icon.scss文件内的图标名称提取出来
 * 形成一个按css文件顺序倒序排列的icon名称数组，并生成文件examples/icon.json文件
 */

'use strict';

var postcss = require('postcss');
var fs = require('fs');
var path = require('path');
var fontFile = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon.scss'), 'utf8');
var nodes = postcss.parse(fontFile).nodes;
var classList = [];

nodes.forEach((node) => {
  var selector = node.selector || '';
  var reg = new RegExp(/\.el-icon-([^:]+):before/);
  var arr = selector.match(reg);

  if (arr && arr[1]) {
    classList.push(arr[1]);
  }
});

classList.reverse(); // 希望按 css 文件顺序倒序排列

fs.writeFile(path.resolve(__dirname, '../../examples/icon.json'), JSON.stringify(classList), () => {});
