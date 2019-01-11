<template>
  <canvas ref="canvas" class="full"></canvas>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class LayerCanvas extends Vue {
  @Prop(String)
  img!: string;
  @Prop(Number)
  width!: number;
  @Prop(Number)
  height!: number;

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
