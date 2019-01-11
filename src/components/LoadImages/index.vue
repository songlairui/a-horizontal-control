<template>
  <div class="load-wrapper">
    <div class="block" v-if="!completed">
      <load-image
        v-for="(task,idx) in scheduing"
        :key="idx"
        :src="task.src"
        @skip="skip(idx,$event)"
        @loaded="loaded(idx, $event)"
        @fail="loadFail(idx,$event)"
      ></load-image>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import LoadImage from './LoadImage.vue';

interface Task {
  src: string;
  i: number;
}

@Component({
  components: { LoadImage },
})
export default class LoadImages extends Vue {
  @Prop({ type: Array, default: () => [] })
  srcs!: string[];

  @Prop({ type: Number, default: 5 })
  threads!: number;

  tasks: Task[] = this.srcs.map((src, i) => ({ src, i }));
  scheduing: Task[] = [];
  succeedTask: Task[] = [];
  failedTask: Task[] = [];

  taskLength: number = this.srcs.length;
  completedCount: number = 0;
  completed: boolean = false;

  mounted() {
    this.scheduing.push(...this.tasks.splice(-this.threads));
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
        this.scheduing[i] = nextTask;
      }
    } else {
      this.$emit('finish');
      this.completed = true;
    }
  }
}
</script>
