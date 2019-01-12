<template>
  <div v-if="!isImg" v-show="false"></div>
  <img v-else v-show="!bye" class="one-px" :src="src" @load="loaded" @abort="fail" @error="fail">
</template>
<script lang="ts">
import { Vue, Component, Emit, Prop, Watch } from 'vue-property-decorator';
@Component
export default class LoadImage extends Vue {
  @Prop({ type: String, default: '' })
  src!: string;

  isImg: boolean = true;
  bye: boolean = false;

  @Emit('loaded')
  loaded(e: any) {
    this.bye = true;
    return e;
  }

  @Emit('fail')
  fail(e: any) {
    this.bye = true;
    return e;
  }

  @Watch('src')
  @Emit('skip')
  srcReceived(val: string) {
    const isImg = this.maybeImg(val);
    this.isImg = isImg;
    return isImg;
  }

  maybeImg(src: string = '') {
    return /^[.\/]/.test(src) || /^(https?|data):/.test(src);
  }
}
</script>
<style scoped>
.one-px {
  width: 1px;
  height: 1px;
  transform: translateZ(-10);
}
</style>

