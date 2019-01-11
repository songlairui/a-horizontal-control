<template>
  <div id="app" ref="app">
    <transition name="component-fade" mode="out-in">
      <div v-if="!assetsReady" class="loading">{{percent}}</div>
      <control v-else :debugging="true" :touching.sync="touching" :direction.sync="direction">
        <pre class="info">{{ info }} {{'\n'}}{{ progress }} {{'\n'}} {{ img }}</pre>
      </control>
    </transition>
    <load-images :srcs="imgs" @progress="onProgress" @finish="finish"/>
    <layer-canvas v-bind="canvasOpt"></layer-canvas>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
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
  assetsReady: boolean = false;
  $refs!: {
    app: HTMLElement;
  };
  get percent() {
    const { completed, total } = this.progress;
    if (total) {
      return `${Math.round((10000 * completed) / total) / 100} %`;
    }
    return '-·-';
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
  onProgress(info: any) {
    this.progress = info;
  }
  finish() {
    setTimeout(() => {
      this.assetsReady = true;
    }, 345);
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
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
