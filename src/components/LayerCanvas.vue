<template>
  <canvas ref="canvas" class="full"></canvas>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import imgMeta from '../all-imgs';

import { ImgItem, SnapDelta } from '@/interfaces/index.interface';

const { middle, top, bottom } = imgMeta;
const picSum = [middle, top, bottom].reduce((a, b) => a + b.length, 1);
let cacheBottomCanvas: HTMLCanvasElement | null = null;
let cacheMiddleCanvas: HTMLCanvasElement | null = null;
let cacheTopCanvas: HTMLCanvasElement | null = null;

const cacheToCanvas = async (
  imgGroup: ImgItem[],
  callback?: (num: number) => void,
) => {
  const el = document.createElement('canvas');
  el.width = bottom[0].w;
  el.height = 1336;
  const ctx = el.getContext('2d');
  if (!ctx) {
    throw new Error('no Canvas Context');
  }
  let i = 0;
  for (const item of imgGroup) {
    const { x, y, w, h } = item;
    const cachedImgEl = new Image();
    cachedImgEl.src = item.file;
    let resolve = (e?: any) => e;
    callback && callback(++i);
    cachedImgEl.onload = () => {
      ctx.drawImage(cachedImgEl, x, y, w, h);
      resolve();
    };

    cachedImgEl.onabort = cachedImgEl.onerror = () => {
      // console.warn('failed', item.file);
      resolve();
    };
    await new Promise((r) => {
      resolve = r;
    });
  }
  return el;
};

const imgEl: HTMLImageElement = new Image();
const imgEls: HTMLImageElement[] = [];

@Component
export default class LayerCanvas extends Vue {
  @Prop(Number)
  width!: number;
  @Prop(Number)
  height!: number;
  @Prop(Boolean)
  touching!: boolean;
  @Prop(Number)
  direction!: number;

  get boardWidth() {
    return Math.round((6667 * this.height) / 667);
  }

  speed: number = 8;
  delta: number = 0;
  snapDelta: SnapDelta = {
    stamp: 0,
    value: 0,
  };

  ctx: CanvasRenderingContext2D | null = null;

  $refs!: {
    canvas: HTMLCanvasElement;
  };
  async mounted() {
    try {
      let i = 0;
      let j = 0;
      let k = 0;
      const vm = this;
      cacheBottomCanvas = await cacheToCanvas(bottom, (num) => {
        i = num;
        vm.$emit('computing', Math.round((10000 * num) / picSum) / 100);
      });
      cacheMiddleCanvas = await cacheToCanvas(middle, (num) => {
        j = num;
        vm.$emit('computing', Math.round((10000 * (i + num)) / picSum) / 100);
      });
      cacheTopCanvas = await cacheToCanvas(top, (num) => {
        k = num;
        vm.$emit(
          'computing',
          Math.round((10000 * (i + j + num)) / picSum) / 100,
        );
      });
      this.init();
      this.$emit('cached');
    } catch (error) {
      // console.info('mounted', error);
    }
  }
  init() {
    const { canvas } = this.$refs;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d');
    this.drawSvg();
  }
  drawSvg(offsetX = 0) {
    const { ctx } = this;
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, this.width, this.height);
    [cacheBottomCanvas, cacheMiddleCanvas, cacheTopCanvas].forEach(
      (cacheCanvas, idx) => {
        if (!cacheCanvas) {
          // console.error('noCanvas', cacheCanvas);
          return;
        }
        ctx.drawImage(
          cacheCanvas,
          -offsetX * (1 + idx),
          0,
          this.width,
          this.height,
          0,
          0,
          this.width,
          this.height,
        );
      },
    );
  }

  @Watch('touching')
  @Watch('direction')
  directionChange() {
    this.animate();
  }
  animate() {
    const vm = this;
    vm.snapDelta = {
      stamp: +new Date(),
      value: this.delta,
    };
    function animate() {
      const { touching, direction } = vm;
      if (!touching) {
        return;
      }
      const curDelta = +new Date() - vm.snapDelta.stamp;
      const val = vm.snapDelta.value + (-direction * curDelta) / vm.speed;
      if (val < 0 && val > vm.width - bottom[0].w) {
        vm.delta = val;
      }
      vm.drawSvg(vm.delta);
      requestAnimationFrame(animate);
    }
    animate();
  }
}
</script>
<style scoped>
.full {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
