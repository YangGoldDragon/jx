<template>
  <div class="shoppingCart-container">
    <div class="cart">
      <cube-scroll ref="scroll">
        <ul class="cart-ul" ref="cartUl">
          <li class="cart-li" v-for="(item, index) of curCartData" :key="index">
            <div class="cart-li-list">
              <div class="list-top">
                <div class="list-left">
                  <input
                    type="checkbox"
                    class="input-checkbox"
                    @change="handleTotalPrice"
                  />
                  <div class="list-left-bar">
                    <img :src="item.img" class="list-left-img" />
                    <span class="goodsName">{{ item.name }}</span>
                  </div>
                </div>
                <div class="list-right">
                  <span @click="handleReduceCartData(item)" class="reduce"
                    >-</span
                  >
                  <input
                    class="reset"
                    type="text"
                    v-model.trim.number.lazy="item.count"
                    @blur="throttle(item)"
                  />
                  <span @click="handleAddCartData(item)" class="add">+</span>
                </div>
              </div>
              <div class="list-bottom">
                <span class="price-count"
                  ><span class="price-count-item">￥</span>{{ item.price }} ×
                  {{ item.count }} =&nbsp;&nbsp;</span
                >
                <span
                  v-text="(item.price * item.count).toFixed(2)"
                  class="singlePrice"
                ></span>
              </div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <footer>
      <div class="allChecked">
        <div class="allChecked-left">
          <span class="allChecked-left-name">全选</span>
          <input
            type="checkbox"
            @change="handleAllCheck"
            ref="allCheck"
            class="allCheck"
          />
        </div>
        <div class="allChecked-right">
          <span class="total">合计：</span>{{ totalPrice }}
        </div>
      </div>
      <div class="clearAndPay">
        <cube-button class="clearCartData" @click="clear"
          >清空购物车</cube-button
        >
        <cube-button @click="pay" class="pay">支付</cube-button>
      </div>
    </footer>
    <navbar></navbar>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ShoppingCart",
  data() {
    return {
      allCheck: false,
      price: 0,
      totalPrice: 0
    };
  },
  computed: {
    ...mapGetters(["curCartData"])
  },
  components: {
    Navbar
  },
  methods: {
    scrollTo() {
      this.$nextTick(() => {
        // reset better-scroll'postion
        this.$refs.scroll.scrollTo(0, 0);
        // you need to caculate scroll-content height when your dom has changed in nextTick
        this.$refs.scroll.refresh();
      });
    },
    ...mapActions([
      "reduceCartData",
      "addCartData",
      "clearCartData",
      "resetCartData"
    ]),
    async handleReduceCartData(item) {
      await this.reduceCartData(item);
      this.handleTotalPrice();
    },
    async handleAddCartData(item) {
      await this.addCartData(item);
      this.handleTotalPrice();
    },
    async handleClearCartData(item) {
      await this.clearCartData(item);
      this.handleTotalPrice();
    },
    async handleResetCartData(item) {
      await this.resetCartData(item);
      this.handleTotalPrice();
    },
    pay() {
      this.$createDialog({
        type: "confirm",
        icon: "cubeic-alert",
        title: "确认支付？",
        content: "",
        confirmBtn: {
          text: "确定按钮",
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "取消按钮",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => {
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: "支付成功！"
          }).show();
          this.handlePay();
        },
        onCancel: () => {
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: "取消支付！"
          }).show();
        }
      }).show();
    },
    clear() {
      this.$createDialog({
        type: "confirm",
        icon: "cubeic-alert",
        title: "确定清空购物车？",
        content: "",
        confirmBtn: {
          text: "确定按钮",
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "取消按钮",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => {
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: "购物车已清空！"
          }).show();
          this.handleClearCartData();
        },
        onCancel: () => {
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: "取消清空！"
          }).show();
        }
      }).show();
    },
    throttle(item) {
      let status = true;
      let _this = this;
      if (status) {
        status = false;
        setTimeout(function() {
          _this.handleResetCartData(item);
          status = true;
        }, 200);
      }
    },
    handleTotalPrice() {
      let startPrice = 0;
      let inputs = this.$refs.cartUl.getElementsByClassName("input-checkbox");
      for (let input of inputs) {
        if (input.checked) {
          startPrice += parseFloat(
            input.parentNode.parentNode.parentNode.querySelectorAll(
              ".singlePrice"
            )[0].innerText
          );
        }
      }
      this.totalPrice = startPrice.toFixed(2);
    },
    handleAllCheck() {
      let inputs = this.$refs.cartUl.getElementsByClassName("input-checkbox");
      if (this.$refs.allCheck.checked) {
        for (let input of inputs) {
          input.checked = true;
        }
      } else {
        for (let input of inputs) {
          input.checked = false;
        }
      }
      this.handleTotalPrice();
    },
    handlePay() {
      let inputs = this.$refs.cartUl.querySelectorAll(".input-checkbox");
      for (let input of inputs) {
        if (input.checked) {
          let name = input.parentNode.querySelectorAll(".goodsName")[0]
            .innerText;
          let item = {};
          item.name = name;
          item.pay = true;
          this.handleReduceCartData(item);
        }
      }

      for (let input of inputs) {
        input.checked = false;
      }
    }
  },
  mounted() {},
  deactivated() {
    this.scrollTo();
  },
  activated() {
    this.scrollTo();
  }
};
</script>

<style lang="stylus" scoped>
.cart
  height 60vh
  .cart-ul
    .cart-li
      padding 10px
      .cart-li-list
        .list-top
          width 100%
          display flex
          align-items center
          justify-content space-between
          .list-left
            display flex
            align-items center
            .input-checkbox
              zoom: 180%
              margin 0 10px 0 0
            .list-left-bar
              display flex
              justify-content center
              align-items center
              flex-direction column
              .list-left-img
                width 100px
                height 100px
              .goodsName
                text-align center
                font-size 14px
                padding 10px
                box-sizing border-box
                width 100px
                overflow: hidden;
                text-overflow: ellipsis;
                white-space:nowrap;
          .list-right
             display flex
             justify-content center
             align-items center
             .reduce, .add
              text-align center
              font-size 30px
              padding 10px 20px
             .reset
              font-size 14px
              width 30px
              border 1px solid black
              border-radius initial
              padding 10px 2px
              text-align center
              outline none
              -webkit-appearance none
        .list-bottom
          display flex
          align-items center
          padding 0 0 10px 0
          margin-left 40px
          .price-count
            font-size 14px
            .price-count-item
              font-size 16px
          .singlePrice
            font-size 16px
footer
  position fixed
  left 0
  bottom 55px
  .allChecked
    width 100vw
    min-height 40px
    display flex
    justify-content space-between
    align-items center
    .allChecked-left
      display flex
      align-items center
      .allChecked-left-name
        font-size 14px
        padding 10px
      .allCheck
        zoom 180%
    .allChecked-right
      margin-right 20px
      font-size 14px
      .total
        font-size 16px
  .clearAndPay
    display flex
    justify-content space-between
    align-items center
    padding 10px 20px
    .clearCartData, .pay
      width 30vw
      justify-content center
      align-items center
      background orange
      font-size 14px
</style>
