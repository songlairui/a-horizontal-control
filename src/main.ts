import Vue, { VueConstructor } from 'vue';
import App from './App.vue';
import Components from './components';

Object.values(Components).forEach((component: VueConstructor, idx) => {
  let name = component.name;
  if (!name || name === 'VueComponent') {
    name = `G${idx}`;
  }
  Vue.component(name, component);
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
