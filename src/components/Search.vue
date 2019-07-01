<template>
  <div class="search-container">
    <div class="search">
      <span class="cubeic-search"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search"
};
</script>

<style lang="stylus" scoped>
.search-container
  display flex
  width 100%
  justify-content center
  .search
    display flex
    align-items center
    padding 5px 10px
    height 20px
    width 90vw
    border 1px solid white
    border-radius 3px
    .cubeic-search
      color white
      font-size 18px
</style>
