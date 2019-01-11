<template>
  <div id="app">
    <control :debugging="true" :touching.sync="touching" :direction.sync="direction">
      <pre class="info">{{ info }}</pre>
    </control>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  direction: number = 1;
  touching: boolean = false;
  get info(): string {
    const touching = this.touching ? 'touching' : '--------';
    return (this.direction === -1
      ? ['←', touching, '  ']
      : ['  ', touching, '→']
    ).join(' ');
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Courier New', Courier, monospace;
}
.info {
  text-align: center;
}
</style>
