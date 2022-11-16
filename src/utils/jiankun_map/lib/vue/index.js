import vue_map from './map/index.js';
import vue_legend from './legend/index.js';
import vue_map3d from './map3d/index.js';
import vue_map2d from './map2d/index.js';

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

const components = [ vue_map , vue_legend , vue_map3d , vue_map2d ]
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
	install 
}