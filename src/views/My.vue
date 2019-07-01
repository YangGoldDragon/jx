<template>
  <div class="my-container">
    <div class="username-bar">
      <div class="username-bar-left">
        <span class="cubeic-smile"></span>
      </div>
      <div class="username-bar-right">
        <span class="welcome">欢迎回来！</span>
        <span class="username">用户名：{{ newUsername }}</span>
      </div>
      <div class="signout" @click="handleSignout">退出登陆！</div>
    </div>
    <ul class="all">
      <li>
        <span class="cubeic-credit-card allIcon"></span>
        <span class="name">代付款</span>
      </li>
      <li>
        <span class="cubeic-red-packet allIcon"></span>
        <span class="name">待收货</span>
      </li>
      <li>
        <span class="cubeic-safe-pay allIcon"></span>
        <span class="name">退换/售后</span>
      </li>
      <li>
        <span class="cubeic-vip allIcon"></span>
        <span class="name">全部订单</span>
      </li>
    </ul>
    <navbar></navbar>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "My",
  data() {
    return {
      newUsername: ""
    };
  },
  components: {
    Navbar
  },
  computed: {
    ...mapGetters(["curToken"])
  },
  methods: {
    ...mapActions(["signout"]),
    handleSignout() {
      this.signout();
      this.$router.push("/signin");
    },
    username() {
      this.newUsername = this.curToken.token.split("-")[1];
    }
  },
  activated() {
    this.username();
  }
};
</script>

<style lang="stylus" scoped>
.username-bar
  width 100%
  height 150px
  background orange
  display flex
  align-items center
  position relative
  .signout
    position absolute
    right 10px
    top 10px
    font-size 12px
    color white
    padding-bottom 1px
    border-bottom 1px solid white
  .username-bar-left
    margin-left 20px
    .cubeic-smile
      font-size 80px
      color white
  .username-bar-right
    margin-left 20px
    height 50px
    display flex
    flex-direction column
    justify-content flex-end
    .username, .welcome
      margin-top 10px
      font-size 16px
      color white
.all
  display flex
  width 100%
  box-sizing border-box
  justify-content space-between
  padding 10px
  li
    display flex
    flex-direction column
    align-items center
    .allIcon
      font-size 20px
      color orange
    .name
      font-size 12px
      margin-top 5px
</style>
