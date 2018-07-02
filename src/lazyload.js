const DEFAULT_ERROR_URL = './404.svg';
const DEFAULT_LOAD_URL = './loading-spin.svg';

export default class LazyLoad {
	constructor() {
    this.options = {
    	loadUrl: DEFAULT_LOAD_URL,
    	errorUrl: DEFAULT_ERROR_URL
    };
  }

  register(options){
  	Object.assign(this.options, options);
  }
} 