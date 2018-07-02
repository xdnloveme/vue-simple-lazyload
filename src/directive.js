import eventlistener from './cores/eventlistener'

var listener = null;

export default {

	inserted: function (el,binding, vnode, oldVnode) {
		var EventListener = new eventlistener(el,binding, vnode);
		listener = EventListener;
		EventListener.init();
		EventListener.startListen();
  },
	update: function(el,{name,value,oldValue,expression}, vnode, oldVnode){
		if(value === oldValue){
			return;
		}
		listener.update(el,value);
	},
	unbind: function(){
		listener.removeListen();
	}
	
}