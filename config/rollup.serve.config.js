import buble from 'rollup-plugin-buble';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import {uglify} from 'rollup-plugin-uglify';
import {minify } from 'uglify-es';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';

export default {
  input: 'src/index.js',
  output: {
    file:'./test/vue-simlazy.js',
    format:'umd'
  },
  moduleName: 'LazyLoad',
  plugins:[
  	resolve({
      browser: true // Default: false
    }),
  	commonjs(),
  	buble(),
  	babel({
      exclude:'node_modules/**'
    }),
    uglify({
      compress:{
        drop_console:true
      }
    },minify),
    serve({
      open: true, // 是否打开浏览器
      contentBase: './test', // 入口html的文件位置
      historyApiFallback: true, // Set to true to return index.html instead of 404
      host: 'localhost',
      port: 10001
    })
  ]
};