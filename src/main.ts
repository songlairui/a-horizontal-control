import Vue, { VueConstructor } from 'vue';
import App from './App.vue';
import Components from './components';

Object.entries(Components).forEach((item) => {
  const name: string = item[0];
  const component: VueConstructor<Vue> = item[1];
  Vue.component(name, component);
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
