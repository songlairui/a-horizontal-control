<template>
  <canvas ref="canvas" class="full"></canvas>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
export default class LayerCanvas extends Vue {
  @Prop(String)
  img!: string;
  @Prop(Number)
  width: number = 320;
  @Prop(Number)
  height: number = 480;

  $refs!: {
    canvas: HTMLCanvasElement;
  };
  mounted() {
    this.init();
  }
  init() {
    const { canvas } = this.$refs;
    canvas.width = this.width;
    canvas.height = this.height;
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
