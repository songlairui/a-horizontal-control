<template>
  <div
    ref="ctrl"
    class="ctrl-block"
    :class="{debugging:debugging}"
    @touchmove="moving"
    @touchstart="start"
    @mousedown="start"
    @touchend="stop"
    @mouseup="stop"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { Boundary, EventPosi } from './all.interface';

@Component
export default class Control extends Vue {
  @Prop({ type: Boolean, default: true })
  debugging!: string;

  $refs!: {
    ctrl: HTMLElement;
  };

  touching: boolean = false;
  direction: number = 1;
  boundary: Boundary = {
    width: 1000,
    height: 667,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  };

  mounted() {
    this.initBoundary();
  }

  @Watch('touching')
  @Emit('update:touching')
  onTouchChange(val: boolean) {
    return val;
  }

  @Watch('direction')
  @Emit('update:direction')
  onDirectionChange(val: number) {
    return val;
  }

  initBoundary() {
    const $ctrl = this.$refs.ctrl;
    if (!$ctrl) {
      return;
    }
    const { width, top, left, right, bottom } = $ctrl.getBoundingClientRect();
    this.boundary = { width, top, left, right, bottom };
  }

  start(e: any) {
    const { clientX: x } = e.touches ? e.touches[0] : e;
    if (x === undefined) {
      return;
    }
    this.touching = true;
    const { width, left = 0 } = this.boundary;
    this.direction = x - left < width / 2 ? -1 : 1;
  }
  moving(e: any) {
    const { clientX: x, clientY: y } = e.touches ? e.touches[0] : e;
    if (x === undefined) {
      return;
    }
    const { width, top = 0, left = 0, right = 0, bottom = 0 } = this.boundary;
    const outside = x < left || x >= right || y < top || y > bottom;
    this.touching = !outside;
    if (outside) {
      return;
    }
    this.direction = x - left < width / 2 ? -1 : 1;
  }
  stop() {
    this.touching = false;
  }
}
</script>
<style scoped>
.ctrl-block {
  position: fixed;
  user-select: none;
}
.ctrl-block.debugging {
  top: 41%;
  height: 10%;
  left: 30%;
  width: 40%;
  background: rgba(0, 0, 0, 0.3);
}
</style>

