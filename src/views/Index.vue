<template>
  <div class="index-container">
    <search class="search"></search>
    <slide :slide="slide"></slide>
    <goods-categories :goodsCategories="goodsCategories"></goods-categories>
    <recommend :recommend="recommend"></recommend>
    <navbar></navbar>
  </div>
</template>

<script>
import Search from "@/components/Search";
import Slide from "@/components/Slide";
import GoodsCategories from "@/components/GoodsCategories";
import Recommend from "@/components/Recommend";
import Navbar from "@/components/Navbar";
export default {
  name: "Index",
  data() {
    return {
      slide: [],
      goodsCategories: [],
      recommend: []
    };
  },
  components: {
    Search,
    Slide,
    GoodsCategories,
    Navbar,
    Recommend
  },
  created() {
    this.axios({
      url: "https://www.easy-mock.com/mock/5cdda667431f897675a3d7bf/jx/index",
      method: "get"
    }).then(res => {
      if (res.data.success) {
        this.slide = res.data.data.slide;
        this.goodsCategories = res.data.data.goodsCategories;
        this.recommend = res.data.data.recommend;
      }
    });
  }
};
</script>

<style lang="stylus" scoped>
.index-search
    position relative
    width 100%
  .search
    width 100%
    position absolute
    top 5px
    left 0
    z-index 2
    background transparent
    margin 0 auto
</style>
