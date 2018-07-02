import buble from 'rollup-plugin-buble';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import {uglify} from 'rollup-plugin-uglify';
import {minify } from 'uglify-es';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';

const prodFlag = process.env.NODE_ENV || 'development';
const extension = prodFlag == 'production'?'.min.js':'.js';
const name = 'vue-simlazy';

let targets = [{
  file:`./dist/${name}${extension}`,
  format:'umd',
  name:'LazyLoad'
}];

['cjs','es'].forEach( formatName=>{
  //打包所有的format
  let item = {
    file:`./dist/${name}.${formatName}${extension}`,
    format:formatName
  };
  //需要加modeuleName的写入
  if(formatName == 'umd' || 'iife'){
    item['name'] = 'LazyLoad';
  }

  targets.push(item);
});

export default {
  input: 'src/index.js',
  output: targets,
  sourceMap:true,
  plugins:[
    resolve({
      browser: true // Default: false
    }),
    commonjs(),
    buble(),
    babel({
      exclude:'node_modules/**'
    }),
    prodFlag === 'production' && uglify({
      compress:{
        drop_console:true
      }
    },minify)
  ]
};
