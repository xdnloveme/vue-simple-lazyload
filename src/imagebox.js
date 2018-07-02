export default class ImageBox {
  constructor() {
    this.eleAll = [];
    this.item = [];
    this.itemAlready = [];
    this.itemPending = [];
    this.itemFailed = [];
  }

  add(ele,src) {
  	const index = this.itemAlready.findIndex((_item)=>{
  		return _item.ele === ele;
  	})
  	if(index === -1){
  		this.item.push({
	    	ele:ele,
	    	src:src
	    })
  	}
  }

  update(ele,src){
    let index = this.itemAlready.findIndex(item=>{
      return item.ele === ele;
    });

    if(index != -1){
      this.itemAlready.splice(index,1);
      this.add(ele,src);
      return;
    };

    let _index = this.itemFailed.findIndex(item=>{
      return item.ele === ele;
    });

    if(_index !=-1){
      this.itemFailed.splice(_index,1);
      this.add(ele,src);
      return;
    };

  }

  addFailed(ele,src){
  	this._addFailed(ele,src);
  	this._removeFromPending(ele);
  }

  addPending(ele,src){
  	this._addPending(ele,src);
  	this._remove(ele);
  }

  addAlready(ele,src){
  	this._addAlready(ele,src);
  	this._removeFromPending(ele);
  }

  _addAlready(ele,src) {
  	const index = this.itemAlready.findIndex((_item)=>{
  		return _item.ele === ele;
  	})
  	if(index === -1){
  		this.itemAlready.push({
	    	ele:ele,
	    	src:src
	    })
  	}
  }

  _addPending(ele,src) {
  	const index = this.itemPending.findIndex((_item)=>{
  		return _item.ele === ele;
  	})
  	if(index === -1){
  		this.itemPending.push({
	    	ele:ele,
	    	src:src
	    })
  	}
  }

  _addFailed(ele,src) {
  	const index = this.itemFailed.findIndex((_item)=>{
  		return _item.ele === ele;
  	})
  	if(index === -1){
  		this.itemFailed.push({
	    	ele:ele,
	    	src:src
	    })
  	}
  }

  _remove(ele) {
  	const index = this.item.findIndex((_item)=>{
  		return _item.ele === ele;
  	});
  	if(index!=-1){
  		this.item.splice(index,1);
  	}
  }

  _removeFromPending(ele) {
  	const index = this.itemPending.findIndex((_item)=>{
  		return _item.ele === ele;
  	});
  	if(index!=-1){
  		this.itemPending.splice(index,1);
  	}
  }
}
