<template>
  <div class="App ">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.App {
  max-width: 10rem;
  margin: 0 auto;
  height: 100%;
}
</style>