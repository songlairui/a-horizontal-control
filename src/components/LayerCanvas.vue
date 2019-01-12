<template>
  <canvas ref="canvas" class="full"></canvas>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import imgMeta from '../all-imgs';

const { middle, top } = imgMeta;

const imgEl: HTMLImageElement = new Image();
const imgEls: HTMLImageElement[] = [];
const middleWithImg = middle.map((item) => {
  const cachedImgEl = new Image();
  cachedImgEl.src = item.file;
  return { ...item, imgEl: cachedImgEl };
});
const topWithImg = top.map((item) => {
  const cachedImgEl = new Image();
  cachedImgEl.src = item.file;
  return { ...item, imgEl: cachedImgEl };
});

interface SnapDelta {
  stamp: number;
  value: number;
}
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

  speed: number = 1;
  delta: number = 0;
  snapDelta: SnapDelta = {
    stamp: 0,
    value: 0,
  };

  $refs!: {
    canvas: HTMLCanvasElement;
  };
  async mounted() {
    this.init();
    await this.loadImg();
    this.drawSvg();
  }
  init() {
    const { canvas } = this.$refs;
    canvas.width = this.width;
    canvas.height = this.height;
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
    const { canvas } = this.$refs;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, this.width, this.height);
    middleWithImg.forEach((item) => {
      try {
        ctx.drawImage(item.imgEl, item.x + offsetX, item.y, item.w, item.h);
      } catch (error) {
        //
      }
    });
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
        vm.drawSvg(val);
      }
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
