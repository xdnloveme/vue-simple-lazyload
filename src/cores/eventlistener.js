import {isSeen} from '../utils/utils'

export default class EventListener {
  constructor(el,binding,vnode) {
    this.el = el;
    this.binding = binding;
    this.vnode = vnode;
    this.imagebox = null;
    this.$vm = vnode.context;
    this.$lazyload = vnode.context.$lazyload
  }

  init(){
    if(!typeof this.binding.value === 'string'){
      throw new Error("您的图片源不是String类型，请重试");
      return;
    }
  	this.imagebox = this.vnode.context.imagebox;
		this.imagebox.add(this.el,this.binding.value);
    this.listenProcess();
  }

  startListen(){
    var listenProcess = this.listenProcess;
  	document.addEventListener('scroll',listenProcess.bind(this),false);
  }

  removeListen(){
    var listenProcess = this.listenProcess;
    document.removeEventListener('scroll',listenProcess.bind(this),false);
  }

  listenProcess(){
  	const _self = this;
    if(this.imagebox.item.length == 0){
      return;
    };

  	this.imagebox.item.forEach((item)=>{
			if(isSeen(item)){

				var image = new Image();
	      image.src = item.src;
	      _self._imageStyle(item);
	      
	      _self.imagebox.addPending(item.ele,item.src);

	      image.onload = function(){
	        if(image.complete){
	        	_self.imageOnload(item);
	        }
	      }

	      image.onerror = function(){
	        _self.imageOnerror(item);
	      }
			}
		})
  }

  update(ele,src){
    console.log("更新了");
    console.log(this.imagebox);
    this.imagebox.update(ele,src);
    this.listenProcess();
  }

  imageOnload(item){
  	this._removeImageStyle(item.ele);
    this.imagebox.addAlready(item.ele,item.src);
    this._imageSet(item.ele,item.src)
  }

  imageOnerror(item){
  	this._removeImageStyle(item.ele);
    this.imagebox.addFailed(item.ele,item.src);
    this._imageSet(item.ele,this.$lazyload.options.errorUrl)
  }

  _imageStyle(item){
    item.ele.style.background = `url(${this.$lazyload.options.loadUrl}) no-repeat center`;
  }

  _removeImageStyle(ele){
  	ele.style.background = '';
  }

  _imageSet(ele,value){
    ele.src = value;
  }
}
