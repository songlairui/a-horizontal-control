<template>
  <div id="app" ref="app">
    <load-images :srcs="imgs" @progress="onProgress" @finish="finish"/>
    <layer-canvas v-if="assetsReady" v-bind="canvasOpt"/>
    <transition name="component-fade" mode="in-out">
      <div v-if="!assetsReady" class="loading">{{percentDisplay}}</div>
    </transition>
    <control :debugging="true" :touching.sync="touching" :direction.sync="direction">
      <pre class="info">{{ info }} {{'\n'}}{{ progress }} {{'\n'}} {{ img }}</pre>
    </control>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { TweenLite } from 'gsap';

import img from './assets/bg.svg';
import logo from './assets/logo.png';

interface Progress {
  completed: number;
  total: number;
}

@Component
export default class App extends Vue {
  direction: number = 1;
  touching: boolean = false;
  width: number = 360;
  height: number = 540;
  img: string = img;
  imgs: string[] = [img, , , , , , , , , , ,].fill(img).concat(logo);
  progress: any = {};
  percent: number = 0;
  smoothPercent: number = 0;
  assetsReady: boolean = false;
  $refs!: {
    app: HTMLElement;
  };
  @Watch('percent')
  percentChange(val: number) {
    TweenLite.to(this.$data, 0.5, { smoothPercent: val });
  }
  get percentDisplay() {
    return `${this.smoothPercent.toFixed(2)} %`;
  }
  get info(): string {
    const touching = this.touching ? 'touching' : '--------';
    return (this.direction === -1
      ? ['←', touching, '  ']
      : ['  ', touching, '→']
    ).join(' ');
  }
  get canvasOpt() {
    return {
      width: this.width,
      height: this.height,
      img: this.img,
    };
  }
  initBoundary() {
    const { app: $app } = this.$refs;
    const { width, height } = $app.getBoundingClientRect();
    Object.assign(this, { width, height });
  }
  onProgress(info: Progress) {
    const { completed, total } = info;
    this.progress = info;
    if (total) {
      this.percent = Math.round((10000 * completed) / total) / 100;
    } else {
      this.percent = 0;
    }
  }
  finish() {
    setTimeout(() => {
      this.assetsReady = true;
    }, 900);
  }
  mounted() {
    this.initBoundary();
  }
}
</script>

<style lang="less">
html,
body,
div {
  margin: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Courier New', Courier, monospace;
}
.info {
  text-align: center;
}
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  color: aliceblue;
  font-size: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease 0.8s;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
