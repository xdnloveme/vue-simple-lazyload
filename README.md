# vue-simple-lazyload

A very simple Vue lazy loading plugin

## why

1. Smaller,Size less than 10KB
2. Easy to use,very easy to use.
3. Simplify.

## Start

#### JS

```javascript
Vue.use(LazyLoad,{
    loadUrl:'//your loading-image url',
    errorUrl:'//your error-image url'
});
```

#### Html

```html
<img  v-simple-lazy="'url for lazy loading pictures(only string)'">
```

#### example：

```javascript
npm run serve
```

Use this command to see the result.




## 为什么写这个插件

1. 为了更小更简洁的懒加载实现，自己试着写了一个非常简单的懒加载只有7kb大小。
2. 为了更方便的使用，只需一个`v-simple-lazy`就可以实现。
3. 更精简，由于其他一些懒加载的插件比较臃肿，不适合我这种只需要图片懒加载的简单需求的用户，没有多余的功能，简简单单只是为了实现懒加载。

## 开始

#### JS

```javascript
Vue.use(LazyLoad,{
    loadUrl:'//这里写你的加载动作的图片地址',
    errorUrl:'//这里写你的出现错误的比如(404)的图片地址'
});
```

#### Html

```html
<img  v-simple-lazy="写上你需要懒加载的图片地址，只支持String类型，注意这里写上''（单引号）">
```

#### 例子

```javascript
npm run serve
```

通过运行上述命令，可以在本地看代码演示效果
