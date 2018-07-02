import imagebox from './imagebox'

const mixin = {
	data () {
      return {
          imagebox: new imagebox()
      }
  }
}

export default mixin;