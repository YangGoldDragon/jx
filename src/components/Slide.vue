<template>
  <div>
    <cube-slide :data="slide">
      <cube-slide-item v-for="(item, index) in slide" :key="index">
        <img :src="item.image" />
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
  name: "Slide",
  props: ["slide"],
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
>>> img
  display flex
  box-sizing border-box
  width 100vw
</style>
