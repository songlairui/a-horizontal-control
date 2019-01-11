import Vue, { VueConstructor } from 'vue';

import Control from './Control.vue';

interface ExpObj {
  [key: string]: VueConstructor<Vue>;
}

const expObj: ExpObj = { Control };
export default expObj;
