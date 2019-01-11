<template>
  <div id="app" ref="app">
    <layer-canvas v-bind="canvasOpt"></layer-canvas>
    <control :debugging="true" :touching.sync="touching" :direction.sync="direction">
      <pre class="info">{{ info }} {{'\n'}}{{ progress }} {{'\n'}} {{ img }}</pre>
    </control>
    <load-images :srcs="imgs" @progress="onProgress"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import img from './assets/bg.svg';

@Component
export default class App extends Vue {
  direction: number = 1;
  touching: boolean = false;
  width: number = 360;
  height: number = 540;
  img: string = img;
  imgs: string[] = [img, , , , , , , , , , ,].fill(img);
  progress: any = {};
  $refs!: {
    app: HTMLElement;
  };

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
    console.info('info', info);
    this.progress = info;
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
</style>
