import Vue, { VueConstructor } from 'vue';

import Control from './Control.vue';
import LayerCanvas from './LayerCanvas.vue';
import LoadImages from './LoadImages/index.vue';

interface ExpObj {
  [key: string]: VueConstructor<Vue>;
}

const expObj: ExpObj = { Control, LayerCanvas, LoadImages };
export default expObj;
