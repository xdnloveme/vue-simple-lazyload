(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.LazyLoad = factory());
}(this, (function () { 'use strict';

  var isSeen = function isSeen(item, imagebox) {
    var ele = item.ele;
    var src = item.src;
    //图片距离页面顶部的距离
    var top = ele.getBoundingClientRect().top;
    //页面可视区域的高度
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //top + 10 已经进入了可视区域10像素
    if (top + 10 < windowHeight) {
      return true;
    } else {
      return false;
    }
  };

  var EventListener = function EventListener(el, binding, vnode) {
    this.el = el;
    this.binding = binding;
    this.vnode = vnode;
    this.imagebox = null;
    this.$vm = vnode.context;
    this.$lazyload = vnode.context.$lazyload;
  };

  EventListener.prototype.init = function init() {
    this.imagebox = this.vnode.context.imagebox;
    this.imagebox.add(this.el, this.binding.value);
    this.listenProcess();
  };

  EventListener.prototype.startListen = function startListen() {
    var listenProcess = this.listenProcess;
    window.addEventListener('scroll', listenProcess.bind(this), false);
  };

  EventListener.prototype.removeListen = function removeListen() {
    var listenProcess = this.listenProcess;
    window.removeEventListener('scroll', listenProcess.bind(this), false);
  };

  EventListener.prototype.listenProcess = function listenProcess() {
    var _self = this;
    if (this.imagebox.item.length == 0) {
      return;
    }
    this.imagebox.item.forEach(function (item) {
      if (isSeen(item)) {

        var image = new Image();
        image.src = item.src;
        _self._imageStyle(item);

        _self.imagebox.addPending(item.ele, item.src);

        image.onload = function () {
          if (image.complete) {
            _self.imageOnload(item);
          }
        };

        image.onerror = function () {
          _self.imageOnerror(item);
        };
      }
    });
  };

  EventListener.prototype.update = function update(ele, src) {
    console.log("更新了");
    console.log(this.imagebox);
    this.imagebox.update(ele, src);
    this.listenProcess();
  };

  EventListener.prototype.imageOnload = function imageOnload(item) {
    this._removeImageStyle(item.ele);
    this.imagebox.addAlready(item.ele, item.src);
    this._imageSet(item.ele, item.src);
  };

  EventListener.prototype.imageOnerror = function imageOnerror(item) {
    this._removeImageStyle(item.ele);
    this.imagebox.addFailed(item.ele, item.src);
    this._imageSet(item.ele, this.$lazyload.options.errorUrl);
  };

  EventListener.prototype._imageStyle = function _imageStyle(item) {
    item.ele.style.background = "url(" + this.$lazyload.options.loadUrl + ") no-repeat center";
  };

  EventListener.prototype._removeImageStyle = function _removeImageStyle(ele) {
    ele.style.background = '';
  };

  EventListener.prototype._imageSet = function _imageSet(ele, value) {
    ele.src = value;
  };

  var listener = null;

  var directive = {

  	inserted: function inserted(el, binding, vnode, oldVnode) {
  		var EventListener$$1 = new EventListener(el, binding, vnode);
  		listener = EventListener$$1;
  		EventListener$$1.init();
  		EventListener$$1.startListen();
  	},
  	update: function update(el, ref, vnode, oldVnode) {
  		var name = ref.name;
  		var value = ref.value;
  		var oldValue = ref.oldValue;
  		var expression = ref.expression;

  		if (value === oldValue) {
  			return;
  		}
  		listener.update(el, value);
  	},
  	unbind: function unbind() {
  		listener.removeListen();
  	}

  };

  var ImageBox = function ImageBox() {
    this.eleAll = [];
    this.item = [];
    this.itemAlready = [];
    this.itemPending = [];
    this.itemFailed = [];
  };

  ImageBox.prototype.add = function add(ele, src) {
    var index = this.itemAlready.findIndex(function (_item) {
      return _item.ele === ele;
    });
    if (index === -1) {
      this.item.push({
        ele: ele,
        src: src
      });
    }
  };

  ImageBox.prototype.update = function update(ele, src) {
    var index = this.itemAlready.findIndex(function (item) {
      return item.ele === ele;
    });

    if (index != -1) {
      this.itemAlready.splice(index, 1);
      this.add(ele, src);
      return;
    }
    var _index = this.itemFailed.findIndex(function (item) {
      return item.ele === ele;
    });

    if (_index != -1) {
      this.itemFailed.splice(_index, 1);
      this.add(ele, src);
      return;
    }};

  ImageBox.prototype.addFailed = function addFailed(ele, src) {
    this._addFailed(ele, src);
    this._removeFromPending(ele);
  };

  ImageBox.prototype.addPending = function addPending(ele, src) {
    this._addPending(ele, src);
    this._remove(ele);
  };

  ImageBox.prototype.addAlready = function addAlready(ele, src) {
    this._addAlready(ele, src);
    this._removeFromPending(ele);
  };

  ImageBox.prototype._addAlready = function _addAlready(ele, src) {
    var index = this.itemAlready.findIndex(function (_item) {
      return _item.ele === ele;
    });
    if (index === -1) {
      this.itemAlready.push({
        ele: ele,
        src: src
      });
    }
  };

  ImageBox.prototype._addPending = function _addPending(ele, src) {
    var index = this.itemPending.findIndex(function (_item) {
      return _item.ele === ele;
    });
    if (index === -1) {
      this.itemPending.push({
        ele: ele,
        src: src
      });
    }
  };

  ImageBox.prototype._addFailed = function _addFailed(ele, src) {
    var index = this.itemFailed.findIndex(function (_item) {
      return _item.ele === ele;
    });
    if (index === -1) {
      this.itemFailed.push({
        ele: ele,
        src: src
      });
    }
  };

  ImageBox.prototype._remove = function _remove(ele) {
    var index = this.item.findIndex(function (_item) {
      return _item.ele === ele;
    });
    if (index != -1) {
      this.item.splice(index, 1);
    }
  };

  ImageBox.prototype._removeFromPending = function _removeFromPending(ele) {
    var index = this.itemPending.findIndex(function (_item) {
      return _item.ele === ele;
    });
    if (index != -1) {
      this.itemPending.splice(index, 1);
    }
  };

  var mixin = {
      data: function data() {
          return {
              imagebox: new ImageBox()
          };
      }
  };

  var DEFAULT_ERROR_URL = './404.svg';
  var DEFAULT_LOAD_URL = './loading-spin.svg';

  var LazyLoad = function LazyLoad() {
    this.options = {
      loadUrl: DEFAULT_LOAD_URL,
      errorUrl: DEFAULT_ERROR_URL
    };
  };

  LazyLoad.prototype.register = function register(options) {
    Object.assign(this.options, options);
  };

  var install = function install(Vue, options) {
  	if (options === void 0) options = {};

  	var lazy = new LazyLoad();
  	lazy.register(options);

  	Vue.prototype.$lazyload = lazy;

  	Vue.mixin(mixin);

  	Vue.directive('simple-lazy', directive);
  };

  var index = {
  	install: install
  };

  return index;

})));
