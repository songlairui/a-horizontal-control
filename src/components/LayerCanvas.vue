<template>
  <canvas ref="canvas" class="full"></canvas>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import imgMeta from '../all-imgs';

import { ImgItem, SnapDelta } from '@/interfaces/index.interface';

const { middle, top, bottom } = imgMeta;
let cacheBottomCanvas: HTMLCanvasElement | null = null;
let cacheMiddleCanvas: HTMLCanvasElement | null = null;
let cacheTopCanvas: HTMLCanvasElement | null = null;

const cacheToCanvas = async (imgGroup: ImgItem[]) => {
  const el = document.createElement('canvas');
  el.width = 12001;
  el.height = 1336;
  const ctx = el.getContext('2d');
  if (!ctx) {
    throw new Error('no Canvas Context');
  }
  for (const item of imgGroup) {
    const { x, y, w, h } = item;
    const cachedImgEl = new Image();
    cachedImgEl.src = item.file;
    let resolve = (e?: any) => e;
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
  img: string = './kill_me/leve1/bg2.svg';

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

  speed: number = 1;
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
      cacheBottomCanvas = await cacheToCanvas(bottom);
      cacheMiddleCanvas = await cacheToCanvas(middle);
      cacheTopCanvas = await cacheToCanvas(top);
      this.init();
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
  async loadImg() {
    await new Promise((r) => {
      imgEl.onload = () => {
        r(imgEl);
      };
      imgEl.src = this.img;
    });
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
      if (val < 0 && val > vm.width - 9999) {
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
