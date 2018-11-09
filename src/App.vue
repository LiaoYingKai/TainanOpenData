<template>
<div id="app">
  <sliderBar class="sliderWidth" />
  <router-view class="pageBackground" />
</div>
</template>

<script>
import sliderBar from '@/components/sliderBar'
export default {
  name: 'App',
  components: {
    sliderBar
  }
}
</script>

<style>
body {
  margin: 0px;
}

#app {
  display: flex;
  font-family: sans-serif;
  width: 100vw;
  /* overflow-y: hidden; */
}

.sliderWidth {
  min-width: 260px;
}

.pageBackground {
  width: 100%;
  background-color: #f4f3ef;
}
</style>
