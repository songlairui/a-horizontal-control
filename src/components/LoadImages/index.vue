<template>
  <div class="load-wrapper">
    <div class="block" v-if="!completed">
      <template v-for="(task,idx) in scheduing">
        <template v-if="!task"></template>
        <load-image
          v-else
          :key="idx"
          :src="task.src"
          @skip="skip(idx,$event)"
          @loaded="loaded(idx, $event)"
          @fail="loadFail(idx,$event)"
        />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { LoadTask } from '@/interfaces/index.interface';
import LoadImage from './LoadImage.vue';

@Component({
  components: { LoadImage },
})
export default class LoadImages extends Vue {
  @Prop({ type: Array, default: () => [] })
  srcs!: string[];

  @Prop({ type: Number, default: 5 })
  threads!: number;

  tasks: LoadTask[] = this.srcs.map((src, i) => ({ src, i }));
  scheduing: LoadTask[] = [];
  activeThreads: number = this.threads;
  succeedTask: LoadTask[] = [];
  failedTask: LoadTask[] = [];

  taskLength: number = this.srcs.length;
  completedCount: number = 0;
  completed: boolean = false;

  mounted() {
    this.scheduing.push(...this.tasks.splice(0, this.threads));
  }

  @Emit('progress')
  processOn(i: number, succeed: boolean = true) {
    const currentTask = this.scheduing[i];
    this[succeed ? 'succeedTask' : 'failedTask'].push(currentTask);
    this.completedCount += 1;
    return {
      completed: this.completedCount,
      total: this.taskLength,
    };
  }

  stopThreads(i: number) {
    // 清除自己
    delete this.scheduing[i];
    this.activeThreads--;
    if (this.activeThreads < 1) {
      this.$emit('finish');
      this.completed = true;
    }
  }

  skip(i: number, bool: boolean) {
    if (bool) {
      this.loadNext(i);
    }
  }
  loaded(i: number, e: Event) {
    this.loadNext(i);
  }
  loadFail(i: number, e: Event) {
    this.loadNext(i, false);
  }
  loadNext(i: number, succeed: boolean = true) {
    this.processOn(i, succeed);
    const nextTask = this.tasks.shift();
    if (nextTask) {
      if (this.scheduing[i].src === nextTask.src) {
        this.loadNext(i);
      } else {
        this.scheduing.splice(i, 1, nextTask);
      }
    } else {
      this.stopThreads(i);
    }
  }
}
</script>
