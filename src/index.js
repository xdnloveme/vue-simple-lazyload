import directive from './directive';
import mixin from './mixin';
import lazyload from './lazyload';

const install = ( Vue,options = {} )=>{
	const lazy = new lazyload();
	lazy.register(options);

	Vue.prototype.$lazyload = lazy

	Vue.mixin(mixin);
	
	Vue.directive('simple-lazy',directive);

}

export default {
	install
};