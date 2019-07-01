<template>
  <div>
    <cube-slide
      ref="slide"
      :data="goodsCategories"
      @change="changePage"
      :auto-play="false"
    >
      <cube-slide-item
        v-for="(item, index) in newGoodsCategories"
        :key="index"
        @click.native="clickHandler(item, index)"
      >
        <div class="icon" v-for="(item2, index2) in item" :key="index2">
          <img :src="item2.img" />
          <span>{{ item2.name }}</span>
        </div>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
  name: "goodsCategories",
  props: ["goodsCategories"],
  data() {
    return {};
  },
  computed: {
    newGoodsCategories() {
      let pageOne = this.goodsCategories.slice(0, 10),
        pageTwo = this.goodsCategories.slice(10, 20);
      return [pageOne, pageTwo];
    }
  },
  methods: {
    changePage(current) {
      console.log("当前轮播图序号为:" + current);
    },
    clickHandler(item, index) {
      console.log(item, index);
    }
  }
};
</script>

<style lang="stylus" scoped>
>>> .cube-slide-dots
  display none
>>> .cube-slide-item
  display flex
  flex-wrap wrap
  justify-content space-between
  align-items center
  padding 10px
  .icon
   display flex
   flex-direction column
   justify-content space-between
   align-items center
   width 60px
   margin-bottom 15px
   img
     display flex
   span
     font-size 12px
     padding-top 6px
</style>
