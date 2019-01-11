<template>
  <div id="app">
    <control :debugging="true" :touching.sync="touching" :direction.sync="direction">
      <pre>{{ info }}</pre>
    </control>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app',
  data() {
    return {
      direction: 1,
      touching: false,
    };
  },
  computed: {
    info(): string {
      const touching = this.touching ? 'touching' : '--------';
      return (this.direction === -1
        ? ['←', touching, '  ']
        : ['  ', touching, '→']
      ).join(' ');
    },
  },
});
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
