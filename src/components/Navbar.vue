<template>
  <div class="navbar-container" ref="navbarContainer">
    <cube-tab-bar v-model="curPage" @change="changeHandler">
      <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index">
        <!-- name为icon的插槽 -->
        <div slot="icon" :class="item.icon"></div>
        <!-- 默认插槽 -->
        {{ item.label }}
        <div class="shoppingCartNum" v-show="item.label === '购物车'">
          {{ total }}
          <span v-show="total >= 999">+</span>
        </div>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      curPage: "",
      tabs: [
        {
          label: "首页",
          icon: "cubeic-home"
        },
        {
          label: "分类",
          icon: "cubeic-tag"
        },
        {
          label: "购物车",
          icon: "cubeic-mall"
        },
        {
          label: "我的",
          icon: "cubeic-person"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["curCartData"]),
    total: function() {
      let sum = 0;
      for (let item of this.curCartData) {
        sum += item.count;
      }
      if (sum > 999) {
        sum = 999;
      }
      return sum;
    }
  },
  methods: {
    ...mapActions(["setShopCartPosition"]),
    changeHandler(label) {
      switch (label) {
        case "首页":
          this.$router.push("/");
          break;
        case "分类":
          this.$router.push("/categories");
          break;
        case "购物车":
          this.$router.push("/shoppingcart");
          break;
        case "我的":
          this.$router.push("/my");
          break;
      }
    }
  },
  created() {
    //获取购物车的位置
    this.$nextTick(function() {
      let shopCartPosition = document
        .getElementsByClassName("cubeic-mall")[0]
        .getBoundingClientRect();

      //购物车位置存入vuex
      this.setShopCartPosition(shopCartPosition);
    });
  },
  activated() {
    switch (this.$route.path) {
      case "/":
        this.curPage = "首页";
        break;
      case "/categories":
        this.curPage = "分类";
        break;
      case "/shoppingcart":
        this.curPage = "购物车";
        break;
      case "/my":
        this.curPage = "我的";
        break;
    }
  },
  deactivated() {
    //获取购物车的位置
    this.$nextTick(function() {
      let shopCartPosition = document
        .getElementsByClassName("cubeic-mall")[0]
        .getBoundingClientRect();

      //购物车位置存入vuex
      this.setShopCartPosition(shopCartPosition);
    });
  },
  mounted() {
    //获取购物车的位置
    this.$nextTick(function() {
      let shopCartPosition = document
        .getElementsByClassName("cubeic-mall")[0]
        .getBoundingClientRect();

      //购物车位置存入vuex
      this.setShopCartPosition(shopCartPosition);
    });
  }
};
</script>

<style lang="stylus" scoped>
.navbar-container
  position fixed
  bottom 0
  left 0
  width 100%
  z-index 1000
  background-color white
  box-shadow: 0 0 10px 0 hsla(0,6%,58%,.6);
  font-size 18px
  .cube-tab-bar
    .cube-tab_active
      color orange
    .cube-tab
      position relative
      .shoppingCartNum
        position absolute
        top 0
        right 10px
        background-color orange
        width 25px
        height 25px
        font-size 12px
        border-radius 50%
        color white
        display flex
        justify-content center
        align-items center
</style>
