<template>
  <div class="recommend-container">
    <h6 class="recommendForYou">为你推荐</h6>
    <ul class="recommend-ul">
      <li v-for="(item, index) of recommend" class="recommend-li" :key="index">
        <img :src="item.imgUrl" />
        <span class="goodsName">{{ item.name }}</span>
        <span class="goodsPrice">￥{{ item.price }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props: ["recommend"]
};
</script>

<style lang="stylus" scoped>
.recommend-container
  .recommendForYou
    display flex
    justify-content center
    align-items center
    background #f8f8f8
    padding 10px
    font-size 20px
    color orange
  .recommend-ul
   display flex
   flex-wrap wrap
   justify-content space-between
   padding 10px
   margin-bottom 50px
   .recommend-li
     overflow hidden
     width 45vw
     display flex
     flex-direction column
     flex-wrap wrap
     margin-bottom 20px
     .goodsName
       padding 5px 10px
       font-size 14px
     .goodsPrice
       padding 5px 10px
       font-size 12px
</style>
