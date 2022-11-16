import Map from './src/main';
/* istanbul ignore next */
Map.install = function(Vue) {
  Vue.component(Alert.name, Alert);
};

export default Map;