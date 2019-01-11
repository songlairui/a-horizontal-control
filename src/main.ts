import Vue, { VueConstructor } from 'vue';
import App from './App.vue';
import Components from './components';

Object.values(Components).forEach((component: VueConstructor, idx) => {
  Vue.component(component.name || `G${idx}`, component);
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
